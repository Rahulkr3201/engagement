# Deepshikha & Madhukesh — Engagement Invitation

A responsive, single-page React invitation built with Vite, CSS, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Vite. For production, run `npm run build`; the static website is generated in `dist/`. Use `npm run preview` to preview that build.

## Deploy (Vercel via GitHub)

Push this repo to GitHub, then in Vercel choose **Add New → Project**, import the repo, and keep the detected **Vite** preset (build `npm run build`, output `dist`). Every push to `main` redeploys automatically.

## Personalize

Edit `src/data/invitationData.js` for names, parents, date, time, venue, address, map URL, image paths, and schedule. Update all date fields (including `startsAt`, which drives the countdown) together when changing the event date.

Add the confirmed Google Maps URL to `event.mapUrl` to enable Get Directions. It opens a new tab. Until then, the button is disabled with an explanatory note.

The palace-and-couple image is AI-generated illustrative artwork, not a photograph of the actual couple. Replace `public/images/palace-couple.jpg` or assign separate images for hero, venue and closing in the data file. Mobile uses a dedicated responsive composition and CSS crop of the same scene.


## Structure

`src/components/` contains Navbar, Hero, Invitation, SaveTheDate, Venue, Schedule, Footer, and Ornament. `src/styles/global.css` contains the design system, responsive layouts, focus states, subtle entrance animation, and reduced-motion support.

Google Fonts are loaded online; local serif/cursive fallbacks are provided. Artwork is stored locally. No routes or heavy UI library are used.
