'use strict';

const minifiedCSS = `MINIFIED_CSS`;

/**
 * Start injecting as soon as the DOM model is ready
 */
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("Check if achromajs is enabled via URL or local storage.");
    if (achromajs.isEnabled()) {
        console.log("Injecting achromajs into DOM.");
        achromajs.inject();
    }
});


/**
 * Define a namespace for AchromaJS.
 */
var achromajs = window.achromajs || {}

/**
 * Check in the DOM local storage if AchromaJS is enabled.
 * This check is per domain. 
 * If the query paramter 'achromajs' is set to true or 1 the feature will be enabled and the satus will be stored in the localStorage.
 * If the parameter is set to 'false' or '0' it will be disabled.
 * If not provided or set to any other value the currently saved value from localStorage will be used.
 */
achromajs.isEnabled = function () {
    if (!window.localStorage) {
        return false;
    }

    const query = new URL(document.location).searchParams.get('achromajs');

    if (query == 'true' || query == '1') {
        localStorage.setItem('AchromaJSEnabled', true);
        console.info('Enabling AchromaJS');
    } else if (query == 'false' || query == '0') {
        // If the query parameter achromajs is set to false, disable AchromaJS
        localStorage.setItem('AchromaJSEnabled', false);
        console.info('Disabling AchromaJS');
    }

    return localStorage.getItem('AchromaJSEnabled') == 'true';
}


/**
 * Inject the AchromJS popup wrapper into the document.body DOM.
 */
achromajs.inject = function () {

    // Append a new style element to the body containing the minified AchromaJS styles and filters
    const style = document.createElement('style');
    style.innerHTML = minifiedCSS;
    document.body.append(style);

    const wrapper = document.createElement('div');

    wrapper.classList = 'achromajs-wrapper';
    wrapper.innerHTML = 'AchromaJS';


    document.body.append(wrapper);

}


achromajs.onSelectFilter = function (ev) {

}


var scriptSource = (function () {
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1];

    if (script.getAttribute.length !== undefined) {
        return script.getAttribute('src')
    }

    return script.getAttribute('src', 2)
}());
