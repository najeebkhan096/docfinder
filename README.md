# DocFinder website

Landing page and privacy policy for the DocFinder app, hosted on Firebase Hosting
(project `docfinder-site`): https://docfinder-site.web.app/

Plain HTML/CSS/JS — no build step.

## Deploy

```bash
firebase deploy --only hosting
```

## Updating store links

Edit the `STORE_LINKS` block at the top of `assets/site.js`:

```js
var STORE_LINKS = {
  play: "https://play.google.com/store/apps/details?id=com.najeebkhan.docfinder",
  appStore: ""   // paste the App Store URL when the iOS app is live
};
```

Setting `appStore` turns every "Coming soon" button into a live App Store button.

## Files

- `index.html` — landing page
- `privacy.html` — privacy policy (also at `/privacy`); use this URL in Play Console / App Store Connect
- `app-ads.txt` — AdMob authorised sellers (must stay at the site root)
- `firebase.json`, `.firebaserc` — Firebase Hosting config
- `assets/` — styles, script, icons
