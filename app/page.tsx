import Link from 'next/link';
import styles from './page.module.css';

const highlights = [
  {
    title: 'Golden Crisp Visuals',
    description:
      'Rich amber tones, shimmering highlights, and luxe gradients evoke the warmth of perfectly fried potatoes.'
  },
  {
    title: 'Dynamic Storytelling',
    description:
      'A subtle light sweep and evolving captions walk viewers through the craveable journey of each fry.'
  },
  {
    title: 'Audio Atmosphere',
    description:
      'Soft sine-wave swells add a handcrafted signature soundtrack to the ten-second promotional bump.'
  }
];

const storyboard = [
  {
    timecode: '00:00 - 00:03',
    description:
      'Warm studio lighting reveals a cascade of glistening fries as the headline “Golden French Fries” fades in.'
  },
  {
    timecode: '00:03 - 00:06',
    description:
      'Mid-shot lingers on texture details while supporting copy highlights the crispy shell and fluffy interior.'
  },
  {
    timecode: '00:06 - 00:10',
    description: 'Energy builds with a bright accent flare and the bold call-to-action “Treat yourself today!”'
  }
];

const workflowSteps = [
  'Install dependencies and tooling with `npm install`.',
  'Generate or refresh the promotional cut using `npm run generate:video`.',
  'Preview the experience locally with `npm run dev`.',
  'Ship to production-ready static assets via `npm run build`.'
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.hero_content}>
          <h1>Golden French Fries Spotlight</h1>
          <p>
            Serve up the crunch with a crafted ten-second hero video dedicated to the world’s favorite side. The
            scene glows with caramel highlights, evocative typography, and tasteful motion that does every fry justice.
          </p>

          <div className={styles.cta_group}>
            <Link className={styles.primary_cta} href="#workflow">
              Recreate the Cut
            </Link>
            <Link className={styles.secondary_cta} href="#storyboard">
              Review Storyboard
            </Link>
          </div>
        </div>

        <figure className={styles.video_card}>
          <video
            className={styles.video}
            controls
            loop
            playsInline
            preload="auto"
            src="/media/french-fries.mp4"
          >
            Your browser does not support the video tag.
          </video>
          <figcaption className={styles.video_caption}>
            Ten seconds of golden, salted goodness — rendered entirely with FFmpeg from code.
          </figcaption>
        </figure>
      </section>

      <section>
        <h2 className={styles.section_title}>Why These Fries Sizzle on Screen</h2>
        <div className={styles.highlights_grid}>
          {highlights.map((highlight) => (
            <article className={styles.highlight_card} key={highlight.title}>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="storyboard">
        <h2 className={styles.section_title}>Storyboard Beats</h2>
        <div className={styles.storyboard}>
          {storyboard.map((shot) => (
            <article className={styles.storyboard_item} key={shot.timecode}>
              <time>{shot.timecode}</time>
              <p>{shot.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflow} id="workflow">
        <h3>Creative workflow</h3>
        <ol>
          {workflowSteps.map((step) => (
            <li key={step} dangerouslySetInnerHTML={{ __html: step }} />
          ))}
        </ol>
      </section>

      <footer className={styles.footer}>
        <span>
          Looking for alternate cuts or sizing? Tweak <strong>scripts/generate-video.js</strong> and render again.
        </span>
        <span>Video renders to <strong>public/media/french-fries.mp4</strong> for instant playback.</span>
      </footer>
    </main>
  );
}
