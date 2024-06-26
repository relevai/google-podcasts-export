# Google Podcasts Export Chrome Extension

[![build](https://github.com/relevai/google-podcasts-export/actions/workflows/build.yml/badge.svg)](https://github.com/relevai/google-podcasts-export/actions/workflows/build.yml) [![release](https://github.com/relevai/google-podcasts-export/actions/workflows/release.yml/badge.svg)](https://github.com/relevai/google-podcasts-export/actions/workflows/release.yml)

**Update!** Extension is now available on Chrome Webstore https://chromewebstore.google.com/detail/google-podcasts-export/dfhfkmolabaklhefjpdhlobckhckckdc?pli=1

> Google Podcasts is saying goodbye.
> After June 23, 2024, you will no longer be able to listen to podcasts in Google Podcasts.

The official Export feature allows users to export a list of their subscriptions in OPML format.
However, it does not include listening history or queued episodes.

This extension provides a solution by extracting <b>listening history</b> for each subscribed podcast and also exports <b>all queued episodes</b>.
To use the extension, users must be logged into their Google account.
You can download exported data either in XLSX or JSON format.

## Features

- Listening History Export
- Queued Episodes Export
- Original Podcast Episode URLs
- Completed/Started Status
- Time Remaining
- Export in JSON or XLSX format

## Usage in developer mode

To load an extension in developer mode in Chrome, follow these steps:

1. Download [1.0.0.zip](https://github.com/relevai/google-podcasts-export/releases/download/1.0.0/1.0.0.zip)

2. Unpack it somewhere.

3. Open Google Chrome and navigate to the Extensions page. You can do this by typing `chrome://extensions` in the address bar and pressing Enter.

4. Enable the Developer mode by toggling the switch located in the top-right corner of the Extensions page.

5. Click on the "Load unpacked" button, which will open a file dialog.
Navigate to the `dist` directory of unpacked ZIP file.

1. Chrome will load the extension and display it on the Extensions page. You will be redirected to Options page with further instructions for the Export.


## Credits

Is your data from Google Podcasts safe?

<a href='https://ko-fi.com/O4O7Z5A4R' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi4.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

This extension is based on great boilerplate from https://github.com/mubaidr/vite-vue3-chrome-extension-v3
