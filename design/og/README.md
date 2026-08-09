# Open Graph card

`og.html` is the source for `public/og.jpg` — the 1200×630 social card.
It is a plain HTML page, not part of the Next build; nothing here is served.

The card uses the site's own tokens (carmine, ember, ink, the neon arch
colours), the business's own logo lockup, and `entrance-arch.jpg` cropped so
the double neon arch — the single most recognisable thing about the building —
lands in the right third. Every figure on it traces to `src/data/site.ts`.

Fonts are pinned locally in `fonts/` (Fraunces with its SOFT/WONK axes, Archivo,
DM Mono) so the render never silently falls back to Times.

## Rebuild

```sh
cd site/design/og
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1200,630 \
  --virtual-time-budget=6000 --screenshot=og@2x.png "file://$PWD/og.html"

sips -s format jpeg -s formatOptions 86 -z 630 1200 og@2x.png \
  --out ../../public/og.jpg
```

Rendered at 2× and downsampled: type stays crisp, and the output is exactly
1200×630, which is what every card validator checks for.

If the figures on the card change, update them here **and** in `src/data/site.ts`
— the card is a flat image and cannot read from the data file.
