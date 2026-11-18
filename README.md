# MARZÉ — Maison de Location

A luxury dress rental website with a coquette, Marie Antoinette / Baroque look: gilded scroll frames, lace scallops, ribbons and bows.

## Run it
It's a plain static site with no build step. Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify or Vercel.

## Customize
- **Gowns, prices and descriptions:** edit the `GOWNS` list at the top of `script.js`. Each gown is drawn as an illustration from its colours. To show a real photo, add `photo: "assets/your-photo.jpg"` to that gown.
- **Price:** every dress is ₱500 for 3 days. Change `PRICE` and `PERIOD` at the top of `script.js`, plus the hero seal and price notes in `index.html`.
- **Colours and fonts:** the variables at the top of `styles.css`.
- **Booking form:** it only shows a thank-you message right now. To receive requests, connect it to a form service such as Formspree or Netlify Forms (see the note in `script.js`).
