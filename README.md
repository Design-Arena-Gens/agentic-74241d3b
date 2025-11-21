## Golden French Fries Spotlight

This project renders and serves a handcrafted ten-second promotional video highlighting golden french fries. The video is built entirely with FFmpeg filters and surfaced via a Next.js experience that showcases storyboard beats and creative notes.

### Commands

- `npm install` – install dependencies.
- `npm run generate:video` – render `public/media/french-fries.mp4` with FFmpeg.
- `npm run dev` – start the Next.js dev server.
- `npm run build` – compile the production build.

The rendered asset is bundled at deploy time, making the site ready for static hosting on Vercel.
