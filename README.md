# Hridoy Hussain: Upwork Portfolio

Portfolio site of **Hridoy Hussain**, a Top Rated Upwork freelancer working in social media, short-form video and WordPress for healthcare brands.

Upwork: https://www.upwork.com/freelancers/~0115b141eed48701b3

## What's inside

- **Scroll story:** seven steps (Listen, Plan, Write, Design, Edit, Build, Measure) where a healthcare post builds itself inside a phone mockup as you scroll. On phones it becomes a tap-through.
- **Monthly packages:** Starter, Growth and Full care. Choosing a package preselects it in the contact form.
- **Selected work:** three client case studies.
- **Journal:** three articles in `blog/`.
- **Testimonials:** the section is ready but hidden until real, approved reviews are added.
- **Contact form:** sent through [Formspree](https://formspree.io) to Hridoy's inbox, with Upwork as a second option.
- **Brand kit v1.0:** monochrome palette, Montserrat, and the HH monogram (inline SVG). The monogram's dot is the recurring motif.

Plain HTML, CSS and JS. No build step and no dependencies.

## Structure

```
index.html                 The portfolio (styles and script are inline)
blog/blog.css              Shared styles for articles
blog/*.html                Journal articles
assets/images/             Project covers, portrait, favicon
404.html                   Not-found page
robots.txt
```

## Editing

| What | Where |
|---|---|
| Package prices and contents | `<!-- PACKAGES -->` in `index.html` |
| Case studies | `<!-- WORK -->` in `index.html` |
| Show testimonials | Remove `hidden` from `<section id="testimonials">` and fill in each quote with the client's exact words |
| Add an article | Copy a file in `blog/`, then add a card under `<!-- JOURNAL -->` |
| Form destination | The `action` URL on `<form id="mail">` (Formspree form ID) |
| "Available for new clients" | `.status` in the header |

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy with GitHub Pages

1. Push this folder to a repository.
2. Go to **Settings → Pages → Deploy from a branch**, then choose `main` and `/ (root)`.
3. The site goes live at `https://<username>.github.io/<repo>/`.

To use your own domain, enter it under *Custom domain* and add the DNS record GitHub shows you.

The first message through the contact form triggers a confirmation email from Formspree. Confirm it, or later messages won't be delivered.

© Hridoy Hussain. All rights reserved. Client work is shown with permission and may not be reused.
