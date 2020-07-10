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

Available via the official Firefox addons page: [Get Achromafox Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/achromafox/)

## Chrome Extension

Available in the official Chrome webstore: [Get Achromeatic Chrome extension](https://chrome.google.com/webstore/detail/achromeatic/aaljbccmkbfdgnlbndbngcfimephplbi)

## Javascript library

Coming soon

## Supported browsers

The embedded Javascript library supports all modern browsers, including mobile browsers:
* Mozilla Firefox
* Google Chrome (and any recent Webkit or Blink based desktop browser)
* Apple Safari
* Safari on iOS 7+
* Chrome on Android

Achromafox requires a recent version of Mozilla Firefox.

Achromeatic requires a recent version of Google Chrome or derived browsers.


## How to use

### Browser addons

Installing the browser addons will add a new button to the browser's toolbar. Clicking the button will open a popup menu which allows to select the different modes.

### Javascript library

* Download the ZIP package and extract it to your web server environment
  * alternatively you can link directly to the Javascript and CSS files on Github
* include the CSS and Javascript file in your HTML page header, e.g. as this:

```
<link type='text/css' rel='stylesheet' href='achroma/achroma.css' />
<script type="text/javascript" src="achroma/achroma.js"></script>
```
	
* make sure all files (.js, .css and .svg) are in the same directory
* load the page in a web browser and add the parameter `achromajs=enable` to the URL
  * this parameter will set a per-domain cookie to save the AchromaJS state and applied filter across page changes
  * to disable AchromaJS use `achromajs=disable` instead

## Known issues

* **Webkit/Blink** due to [463119](https://code.google.com/p/chromium/issues/detail?id=463119) and [405315](https://code.google.com/p/chromium/issues/detail?id=405315) SVG-based CSS filters require full-path URLs (the library has a workaround script for this)  
* **Webkit/Blink** SVG filters on the body background image are not applied due a bug in the rendering engine 
* **Safari on iOS** Body background image filters are sometimes not reset properly, reloading the page helps

## Developers

### Preconditions

- recommneded editor is Visual Studio Code
- a recent NPM and Node installed

### Firefox

Most browsers allow certain DOM Javascript manipulation only if a page is loaded via a HTTP/HTTPS instead of just loading a local file from disk.
To allow proper UI/UX testing a small NodeJS test server can be spun up as follows:

* fromt the projects root folder start `npm run start`, this will start a Grunt process which will watch and compile changed files into `dist`
* in a second terminal start `npm run start-server`
* open the URL http://localhost:8080 in your browser

### Chrome

* fromt the projects root folder start `npm run start`, this will start a Grunt process which will watch and compile changed files into `dist`
* open the URL [chrome://extensions](chrome://extensions) in Chrome
* Enable **Developer mode** in the top-right corner
* click on **Load unpacked**
* open the folder `dist/achromeatic`



