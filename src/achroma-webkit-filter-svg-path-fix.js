/**
 * Copyright 2015 Hendrik Brandt
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 * 
 * See file LICENSE-Apache-2.0 for the full license.
 */

/**
 * @author Hendrik Brandt
 * @version 15.04
 * 
 */

/*
 * This script will update the default AchromaJS SVG filter urls with absolute URLs using the CSS path as base. The
 * change is only required for Webkit/Blink-based browsers (Chrome, Safari, iOS, Android browsers).
 * 
 * See https://code.google.com/p/chromium/issues/detail?id=463119
 * 
 * See https://code.google.com/p/chromium/issues/detail?id=405315
 * 
 */

var achromajs = window.achromajs || {}

achromajs.webkitSvgPathFix = function() {

	if ( navigator.userAgent.toLowerCase().indexOf( "webkit" ) > 0 ) {

		console.log( "Adding workaround for Webkit/Blink issues #463119 and #405315" );

		var tCSSLink = document.querySelector( "link[href*='achroma']" );

		if ( !tCSSLink ) {
			console.error( "AchromaJS CSS link not found in DOM." );
			return;
		}

		var tPath = tCSSLink.href.replace( /achroma([\.min]*)\.css$/g, '' );
		
		var tCSSBody = document.createElement( 'style' );
		tCSSBody.setAttribute( 'type', 'text/css' );
		tCSSBody.setAttribute( 'rel', 'stylesheet' );

		tCSSBody.innerHTML += '.achromajs-Achromatomaly, body.achromajs-Achromatomaly-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Achromatomaly);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Achromatomaly);}';

		tCSSBody.innerHTML += '.achromajs-Achromatopsia, body.achromajs-Achromatopsia-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Achromatopsia);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Achromatopsia);}';

		tCSSBody.innerHTML += '.achromajs-Protanomaly, body.achromajs-Protanomaly-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Protanomaly);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Protanomaly);}';

		tCSSBody.innerHTML += '.achromajs-Protanopia, body.achromajs-Protanopia-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Protanopia);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Protanopia);}';

		tCSSBody.innerHTML += '.achromajs-Deuteranomaly, body.achromajs-Deuteranomaly-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Deuteranomaly);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Deuteranomaly);}';

		tCSSBody.innerHTML += '.achromajs-Deuteranopia, body.achromajs-Deuteranopia-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Deuteranopia);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Deuteranopia);}';

		tCSSBody.innerHTML += '.achromajs-Tritanomaly, body.achromajs-Tritanomaly-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Tritanomaly);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Tritanomaly);}';

		tCSSBody.innerHTML += '.achromajs-Tritanopia, body.achromajs-Tritanopia-Body:before {';
		tCSSBody.innerHTML += 'filter: url(' + tPath + 'color-filters.svg#Tritanopia);';
		tCSSBody.innerHTML += '-webkit-filter: url(' + tPath + 'color-filters.svg#Tritanopia);}';

		document.body.appendChild( tCSSBody );
	}
}
