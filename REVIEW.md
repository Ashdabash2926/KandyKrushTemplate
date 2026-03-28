# KandyKrush.2 — Review 2026-03-28 — session 4

## Outstanding — waiting on DNS propagation

- **Cloudflare nameservers for `kandykrush.co.uk`** — 123reg updated to `kai.ns.cloudflare.com` / `melody.ns.cloudflare.com`. Cloudflare is actively checking. Can take up to 24hrs.
- **Once Cloudflare activates:**
  - Add `kandykrush.co.uk` and `www.kandykrush.co.uk` as custom domains in Cloudflare Pages (kandykrushtemplate project)
  - Resend will auto-verify `kandykrush.co.uk` DNS (records already added in Cloudflare)
  - Update `RESEND_FROM` in Vercel from `Contact_Form <onboarding@resend.dev>` → `Kandy Krush <hello@kandykrush.co.uk>`
  - Test hire agreement form end-to-end (PDF + email to `balloonsbykandykrush@gmail.com`)
- **OG image** — update URL domain from `kandykrush.org` → `kandykrush.co.uk` and encode spaces as `%20` (file: `index.html` line 18)
- **Cancel Wix Premium** — once `kandykrush.co.uk` is confirmed live. Domain `kandykrush.org` renews Feb 2027 — client can let it lapse or keep for redirect.

## Done today (2026-03-28)

### Domain
- Bought `kandykrush.co.uk` on 123reg (£4/yr, auto-renew on)
- Changed nameservers at 123reg to Cloudflare (`kai` / `melody`)
- Added `kandykrush.co.uk` zone to Cloudflare (free plan)
- Added DNS records in Cloudflare:
  - `CNAME @ → kandykrushtemplate.pages.dev` (proxied)
  - `CNAME www → kandykrushtemplate.pages.dev` (proxied)
  - `TXT resend._domainkey` — DKIM for Resend
  - `MX send → feedback-smtp.eu-west-1.amazonses.com` (priority 10)
  - `TXT send → v=spf1 include:amazonses.com ~all`
  - `TXT _dmarc → v=DMARC1; p=none;`
- `www.kandykrush.org` active on Cloudflare Pages (CNAME via Wix DNS) — interim until `.co.uk` is live
- Abandoned `kandykrush.org` DNS move (Wix locks NS records, Resend blocks MX subdomains on Wix)

### Forms / email
- Hire agreement notification email switched to `balloonsbykandykrush@gmail.com` (was Ash's test email)
- Web3Forms key swapped to client's account (`894b5cbe-a22b-4311-8f49-862235413cbf`) — contact form enquiries now go to `balloonsbykandykrush@gmail.com`
- Resend domain `kandykrush.co.uk` added (replaced `kandykrush.org` which was on free plan limit)
- `RESEND_FROM` temporarily set to `Kandy Krush <hello@kandykrush.co.uk>` — **will fail until domain verified**, revert to `Contact_Form <onboarding@resend.dev>` if needed

### PDF hire agreement
- Fixed text cut-off (was using `substring(0, 80)` — replaced with proper `wrapText` helper)
- Added multi-page support
- Full T&Cs now rendered in PDF (15 sections, formatted with bold headers)
- Fixed duplicate "Signature" heading

### Site
- Copyright updated 2024 → 2026

---

# KandyKrush.2 — Review 2026-03-21 — session 3

## Done today (2026-03-21) — session 3

### Forms & email
- Vercel hire form (`forms2-nu.vercel.app/kandykrush`) restyled: banner image header, green (#8a9490) replacing hot pink, black input text
- `GENERATE CONTRACT` button on `about.html` points to Vercel form
- Contact form on `index.html` wired to Web3Forms (key: `c86c02c1-80b6-4e3b-a03d-f9b16f2ac944`) — emails `lewisashley.t@outlook.com` for testing
  - **To switch to client email:** get new access key at web3forms.com with client's email, swap key in `index.html` hidden input
- Hire form Resend error fixed: hardcoded `onboarding@resend.dev` as sender, notification email set to `lewisashleybutterfield@googlemail.com`
  - **Still blocked on real client email delivery until `kandykrush.org` DNS moves from Wix → Cloudflare**

### DNS move checklist (when ready)
- Screenshot all existing Wix DNS records before touching anything (especially MX records)
- Add domain to Cloudflare — it auto-scans existing records, review carefully
- Add Resend DNS records for domain verification
- Point Cloudflare to Kandykrush.2 Pages site
- Change nameservers at registrar to Cloudflare's NS records
- **First: confirm where `kandykrush.org` is actually registered** (Wix, or external registrar?)
- Don't delete Wix account — leave site unpublished as a rollback option

### Samsung Fold 7 — about.html bug
- Mobile menu was rendering visible without CSS (Tailwind `opacity-0 invisible` not applying)
- Fixed: added `style="display:none"` to mobile menu + updated JS to toggle `display` property
- SVG icons were stretching to full screen without CSS — fixed with explicit `width="40" height="40"` attributes
- **Outstanding:** CSS (`/tw-output.css`) not loading at all on Fold 7 for `about.html` but fine on `index.html`
  - Root-relative path is correct for Cloudflare clean URLs
  - **Test in incognito on Fold 7** — if it looks fine, it's a stale device cache, will clear itself
  - If still broken in incognito, investigate further

---

# KandyKrush.2 — Review 2026-03-21 — session 2

## Done today (2026-03-21) — session 2

### Image rotation tooling
- Built `Python Scripts/image_rotator.py` — GUI tool for rotating .webp images locally
  - Folder picker (remembers last location between sessions)
  - Thumbnail grid with click-to-select and Ctrl+click multi-select
  - CW / CCW rotate buttons + left/right arrow key shortcuts
  - Smooth macOS trackpad scrolling (`yscrollincrement=1`, raw delta)
  - Submit & Save overwrites files with EXIF orientation reset to 1 (prevents browser double-rotation)
  - Delete Duplicates: scans by MD5 hash, shows pairs side-by-side, click to choose which to delete, Confirm deletes permanently
- Built `rotate.js` (Node/Sharp) — quick CLI rotate for single images

### Gallery image fixes
- Rotated images corrected locally using image_rotator.py
- Pushed rotated `.webp` files (not `.jpg`) for:
  - `Images/weddings/` — 13 images
  - `Images/Baby christening/` — 3 images
  - `Images/Corporate/` — 3 images
  - `Images/Garlands/` — 2 images
  - `Images/Halo Hoop Hire/` — 36 images
  - `Images/ORBZ Balloons/` — 73 images
  - `Images/Sequin Shimmer walls/` — 11 images
  - `Images/easel-hire/` — 1 image
- `Images/Childrens/` (Kids Celebrations) — no rotations needed, already correct
- Browser cache issue: use incognito or DevTools → right-click refresh → "Empty Cache and Hard Reload" to verify new images

---

# KandyKrush.2 — Review 2026-03-21 — session 1

> **Standing instruction:** Always commit and push changes to GitHub after every edit. Cloudflare auto-deploys on push.

## Done today (2026-03-21)

- Reverted `Contract.html` to pre-session-2 version (removed banner image, restored original header)
- `GENERATE CONTRACT` button on `about.html` reverted to link to `https://forms2-nu.vercel.app/kandykrush`
- Agreed workflow: form submissions → pdf-lib generates PDF → Resend emails to client. Blocked on `kandykrush.org` DNS move from Wix → Cloudflare
- Once DNS is sorted: verify domain in Resend, update `RESEND_FROM` env var in Vercel to `noreply@kandykrush.org`

---

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
