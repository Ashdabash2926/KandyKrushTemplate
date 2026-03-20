# KandyKrush.2 — Review 2026-03-20

## Done today (2026-03-20) — session 2

- Added `Mandy.jpg` to Our Story section on `about.html` — photo sits left of text on desktop, stacks above on mobile
- Fixed: `Mandy.jpg` was not committed to git (image existed locally but not deployed)
- CSS path in `about.html` changed to root-relative `/tw-output.css` (was relative — caused console error on Cloudflare clean URLs)
- Rebuilt `tw-output.css` to include new layout classes (`h-64`, `md:h-full`, `md:w-64`, `lg:w-72`)
- Image constrained to match text block height using `object-cover` + flex stretch
- `GENERATE CONTRACT` button on `about.html` redirected from `forms2-nu.vercel.app/kandykrush` to local `Contract.html`
- CSS console error (`/Images/tw-output.css` MIME type mismatch) — diagnosed as red herring, page styles correctly; caused by Cloudflare edge serving old cached response for that path

---

## Done today (2026-03-20) — session 1
- All enquiry/book now buttons across the site now link to `index.html#contact` (the homepage contact form)
- Fixed `START YOUR ENQUIRY` on about.html — was going to external Fillout form, now goes to homepage contact form
- Contract page (`Contract.html`) updated:
  - `Contractbanner.png` added as full-width header image
  - Removed "Kandy Krush" heading from contract page header, kept "Equipment Hire Agreement"
  - Input text colour set to black
  - Generate button colour updated to match banner green (`#8a9490`)
- `GENERATE CONTRACT` button on about.html redirected from `forms2-nu.vercel.app/kandykrush` to local `Contract.html`
- `Contractbanner.png` committed and pushed to GitHub

---

# KandyKrush.2 — Review 2026-03-18

## URLs
- Site: `kandykrushtemplate.pages.dev` → GitHub: `Ashdabash2926/KandyKrushTemplate`
- Hire form: `forms2-nu.vercel.app/kandykrush` → GitHub: `Ashdabash2926/forms2`

## Done today (forms2)
- Swapped PDFKit → pdf-lib (PDFKit font files missing in Vercel serverless)
- Fixed `✓` WinAnsi encoding error in PDF
- Fixed env var mismatch: code uses `RESEND_FROM`, was set as `RESEND_FROM_EMAIL` in Vercel
- Fixed Resend silent failure (now throws on error so failures surface)
- Fixed git remote (was pushing to `forms` not `forms2`)
- Merged diverged repos, build passing

## Blocked — email not working
- Resend free plan: can only send to account owner's email without verified domain
- `kandykrush.org` DNS managed by Wix → Wix blocks MX subdomains needed for Resend
- **Fix**: move `kandykrush.org` DNS to Cloudflare, add Resend records, point domain to new site
- Client wants to move off Wix anyway — do both at once
- Wix login blocked by Brave popup blocker — unblock and check if domain is registered via Wix or external registrar

## KandyKrush.2 site — outstanding fixes
| Priority | Issue | File |
|---|---|---|
| High | Contact form is fake — JS intercepts, sends nothing | index.html |
| Med | Broken HTML: unclosed `<p>` before `<h1>` in hero | index.html |
| Low | Copyright 2024 → 2026 | index.html, about.html |
| Low | OG image URL has unencoded spaces | index.html |
| Low | Facebook URL capitalisation inconsistent | index.html |
| Low | Nav logo has `loading="lazy"` (above fold) | about.html |
| Low | `.gitignore` missing `.DS_Store` entries | .gitignore |

## Env vars (Vercel → forms2 project)
- `RESEND_API_KEY` ✓ set
- `RESEND_FROM` ✓ set (`Contact Form <onboarding@resend.dev>`) — update to `noreply@kandykrush.org` once domain verified
- `GOOGLE_SERVICE_ACCOUNT_KEY` — not set, Drive upload skipped silently (fine for now)
