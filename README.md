## AchromaJS/Achromafox/Achromeatic

AchromaJS is a Javascript library to simulate different conditions of eye vision.
Achromafox and Achromeatic are addons for Firefox and Chrome using this library.

## Supported Vision Simulations

* **Achromatomaly** Lacking most color vision
* **Achromatopsia** Lacking all color vision (aka color blind)
* **Protanomaly** Poor red-green hue discrimination
* **Protanopia** Red colors appears dark
* **Deuteranomaly** Llightly red-green hue discrimination
* **Deuteranopia** Moderate red-green hue discrimination
* **Tritanomaly** Low blue-yellow hue discrimination
* **Tritanopia** Absence of blue retinal receptors

* **Blurry** No glasses or contact lenses
* **Low Contrast** Similar to reading a mobile screen in the sunlight
* **High Contrast** Pure black-white filter
* **Inverted Colors** Invert all colors of a web page

## Firefox Addon

Available via the official Firefox addons
page: [Get Achromafox Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/achromafox/)

## Chrome Extension

Available in the official Chrome
webstore: [Get Achromeatic Chrome extension](https://chrome.google.com/webstore/detail/achromeatic/aaljbccmkbfdgnlbndbngcfimephplbi)

## Javascript library

Coming soon

## Supported browsers

The embedded Javascript library supports all modern browsers, including mobile browsers:

* Mozilla Firefox
* Google Chrome (and derived browsers)
* Chrome on Android

Limited support (see *Known issues*):

* Apple Safari
* Safari on iOS 7+

## How to use

### Browser addons

Installing the browser addons will add a new button to the browser's toolbar.
Clicking the button will open a popup menu which allows to select the different modes.

Enabling a filter on a website will store that filter for the website's domain name,
and will restore the selected filter when the page is loaded next time.

Hint: as the filter restore feature requires additional browser privileges it can be necessary
to grant these permissions via the addon management settings.

### Javascript library

* Download the AchromaJS bundled Javascript file
    * alternatively you can link directly to the Javascript on Github
* include the Javascript file in your HTML page header, e.g. like this:

```
<script type="text/javascript" src="achroma.js"></script>
```

* load the page in a web browser and add the parameter `achromajs=true` to the URL
    * this parameter will set a per-domain cookie to save the AchromaJS state and applied filter across page changes
    * to disable AchromaJS use `achromajs=false` instead

## Known issues

* **Chrome Extension Gallery**: the AchromaJS Chrome extension is not working on the Google Web Store Chrome Extensions
  Gallery due to restrictions hard-coded into Chrome preventing scripting of these websites
* **Safari** does not support SVG-based filters yet, therefore only a subset of filters (blur, invert, contrast) will
  work

## Developers

### Preconditions

- recommneded editor is Visual Studio Code
- a recent NPM and Node installed

### Firefox

Most browsers allow certain DOM Javascript manipulation only if a page is loaded via a HTTP/HTTPS instead of just
loading a local file from disk.
To allow proper UI/UX testing a small NodeJS test server can be spun up as follows:

* fromt the projects root folder start `npm run start`, this will start a Grunt process which will watch and compile
  changed files into `dist`
* in a second terminal start `npm run start-server`
* open the URL http://localhost:8080 in your browser

### Chrome

* fromt the projects root folder start `npm run start`, this will start a Grunt process which will watch and compile
  changed files into `dist`
* open the URL [chrome://extensions](chrome://extensions) in Chrome
* Enable **Developer mode** in the top-right corner
* click on **Load unpacked**
* open the folder `dist/achromeatic`



