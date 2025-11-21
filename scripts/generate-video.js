'use strict';

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const durationSeconds = 10;
const fps = 30;
const width = 1920;
const height = 1080;

const projectRoot = path.join(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'media');
const outputPath = path.join(outputDir, 'french-fries.mp4');

const fontCandidates = [
  '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
  '/usr/share/fonts/truetype/freefont/FreeSansBold.ttf'
];

function selectFont() {
  for (const candidate of fontCandidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Unable to locate a fallback font. Tried: ${fontCandidates.join(
      ', '
    )}. Please install any of these fonts or update scripts/generate-video.js.`
  );
}

function ensureFfmpeg() {
  const result = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  if (result.error) {
    throw new Error(
      'FFmpeg is required to render the video. Install it and re-run `npm run generate:video`.'
    );
  }
}

function generate() {
  ensureFfmpeg();
  const fontPath = selectFont();
  fs.mkdirSync(outputDir, { recursive: true });

  const lowerBandY = Math.round(height * 0.62);
  const lowerBandHeight = Math.round(height * 0.38);
  const topBandHeight = Math.round(height * 0.2);
  const headlineY = Math.round(height * 0.28);
  const crispY = Math.round(height * 0.55);
  const fluffyY = Math.round(height * 0.65);
  const ctaY = Math.round(height * 0.78);

  const filters = [
    `drawbox=x=0:y=${lowerBandY}:w=${width}:h=${lowerBandHeight}:color=0x1f0f04@0.78:t=fill`,
    `drawbox=x=0:y=0:w=${width}:h=${topBandHeight}:color=0x3b1f04@0.6:t=fill`,
    `drawbox=x=mod(t*220\\,${width})-120:y=0:w=220:h=${height}:color=0xffffff@0.05:t=fill`,
    `drawtext=fontfile=${fontPath}:text=Golden\\ French\\ Fries:fontcolor=0xffd45f:fontsize=120:x=(w-text_w)/2:y=${headlineY}:shadowcolor=0x000000:shadowx=6:shadowy=6`,
    `drawtext=fontfile=${fontPath}:text=Crispy\\ on\\ the\\ outside\\,:fontcolor=0xffffff:fontsize=66:x=(w-text_w)/2:y=${crispY}:enable='between(t,0.8,7)':shadowcolor=0x000000:shadowx=4:shadowy=4`,
    `drawtext=fontfile=${fontPath}:text=Fluffy\\ on\\ the\\ inside.:fontcolor=0xfff2c4:fontsize=60:x=(w-text_w)/2:y=${fluffyY}:enable='between(t,1.8,8)':shadowcolor=0x000000:shadowx=4:shadowy=4`,
    `drawtext=fontfile=${fontPath}:text=Treat\\ yourself\\ today\\!:fontcolor=0xff9f1c:fontsize=76:x=(w-text_w)/2:y=${ctaY}:enable='between(t,5.2,10)':shadowcolor=0x000000:shadowx=4:shadowy=4`,
    'format=yuv420p'
  ].join(',');

  const audioTrack = `sine=frequency=520:duration=${durationSeconds}:sample_rate=48000`;
  const videoTrack = `color=c=0x1a0f05:size=${width}x${height}:rate=${fps}:d=${durationSeconds}`;

  const args = [
    '-y',
    '-f',
    'lavfi',
    '-i',
    videoTrack,
    '-f',
    'lavfi',
    '-i',
    audioTrack,
    '-vf',
    filters,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '18',
    '-af',
    'volume=0.2',
    '-c:a',
    'aac',
    '-b:a',
    '192k',
    '-ar',
    '48000',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-shortest',
    outputPath
  ];

  console.log(`> Generating french fries spotlight video → ${path.relative(projectRoot, outputPath)}`);
  const ffmpeg = spawnSync('ffmpeg', args, { stdio: 'inherit' });
  if (ffmpeg.status !== 0) {
    throw new Error(`FFmpeg exited with code ${ffmpeg.status}. Check the logs above for details.`);
  }

  console.log('> Video generation complete.');
}

generate();
