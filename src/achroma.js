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

/**
 * Start injecting as soon as the DOM model is ready
 */
document.addEventListener( "DOMContentLoaded", function(event) {
	console.log( "Check if achromajs is enabled via URL or cookie." );
	if ( achromajs.isEnabled() ) {
		console.log( "Injecting achromajs into DOM." );
		achromajs.inject();
		achromajs.webkitSvgPathFix();
		achromajs.restoreFilter();
	}
} );

/**
 * Define a namespace for AchromaJS.
 */
var achromajs = window.achromajs || {}

/**
 * Set the default configuration.
 */
achromajs.localConfig = {
	"enabled": false,
	"filter": "",
	"variant": "",

	/**
	 * Store the current local config as JSON in the achromajs cookie
	 */
	save: function() {
		document.cookie = "achromajs=" + ( JSON.stringify( this ) ) + "; expires=Thu, 31 Dec 2099 12:00:00 UTC; path=/";
	},

	/**
	 * Load values from the achromajs cookie into the current local config 
	 */
	load: function() {
		var tAchromaCookie = document.cookie.replace( /(?:(?:^|.*;\s*)achromajs\s*\=\s*([^;]*).*$)|^.*$/, "$1" );
		
		if (tAchromaCookie != "") {
			var tConfig = JSON.parse( tAchromaCookie );

			this.enabled = tConfig.enabled;
			this.filter = tConfig.filter;
			this.variant = tConfig.variant;
		}
	}
}

/**
 * Set map with all supported color vision modes
 */
achromajs.blindnessModes = {
	'achromato': {
		'Achromatomaly': 'Lacking most color vision',
		'Achromatopsia': 'Lacking all color vision (aka color blind)'
	},
	'prot': {
		'Protanomaly': 'poor red-green hue discrimination',
		'Protanopia': 'red appears dark'
	},
	'deuter': {
		'Deuteranomaly': 'lightly red-green hue discrimination',
		'Deuteranopia': 'moderate red-green hue discrimination'
	},
	'tritan': {
		'Tritanomaly': 'Low blue-yellow hue discrimination',
		'Tritanopia': 'Absence of blue retinal receptors'
	}
};

/**
 * Define contrast modes
 */
achromajs.contrastModes = {
	'blur': {
		"blur-1": "1 pixel blur",
		"blur-2": "2 pixels blur",
		"blur-3": "3 pixels blur"
	},
	"lowcontrast": {
		"lowcontrast": "Laptop or mobile in sunlight"
	},
	"highcontrast": {
		"highcontrast": "Just black and white colors"
	},
	"invert": {
		"invert": "Invert colors"
	}
}

/**
 * Inject the AchromaJS mode selector into the page. Also add additional attribute to each body root node.
 * 
 */
achromajs.inject = function() {

	// Check if touch-based
	document.documentElement.className += ( ( "ontouchstart" in document.documentElement ) ? ' achromajs-touch' : '' );

	achromajs.localConfig.load();

	// Add an additional data attribute to all body root children to retrieve
	// them easier later on
	Array.prototype.slice.call( document.body.childNodes, 0 ).forEach( function(pNode) {
		if ( pNode.nodeName != '#text' && pNode.nodeName != '#comment' ) {
			pNode.setAttribute( "data-achromajs", achromajs.localConfig.variant );
		}
	} );

	// Create and inject a new root div to the body element which holds
	// the achromajs icons and selector list
	var tContainer = document.createElement( 'div' );
	tContainer.setAttribute( 'id', 'ACHROMAJS_CONTAINER' )

	// Create the left blur and contrast mode selection list
	var tContrastModeList = document.createElement( 'ul' );

	Object.keys( achromajs.contrastModes ).forEach( function(pModeName) {
		// Create a selector
		var tItem = document.createElement( 'li' );
		tItem.setAttribute( "data-achromajs-modus", pModeName );
		tItem.addEventListener( "click", achromajs.setMode );
		tContrastModeList.appendChild( tItem );
	} );

	// Create the right color mode selection list
	var tColorModeList = document.createElement( 'ul' );

	// Create the list of blindness selectors
	// and of CSS style filters for each variant
	Object.keys( achromajs.blindnessModes ).forEach( function(pModeName) {
		// Create a selector
		var tItem = document.createElement( 'li' );
		tItem.setAttribute( "data-achromajs-modus", pModeName );
		tItem.addEventListener( "click", achromajs.setMode );

		tColorModeList.appendChild( tItem );
	} );

	tContainer.appendChild( tContrastModeList );
	tContainer.appendChild( document.createElement( 'span' ) );
	tContainer.appendChild( tColorModeList );

	var tWrapper = document.createElement( 'div' )
	tWrapper.setAttribute( 'id', 'ACHROMAJS_WRAPPER' )

	tWrapper.appendChild( tContainer );

	document.body.appendChild( tWrapper );

	// Define extra pseudo-element styles for body background
	var tBodyPseudoCSS = document.createElement( 'style' );
	tBodyPseudoCSS.setAttribute( "id", "achromajs_BODY_CSS" );
	tBodyPseudoCSS.setAttribute( "type", "text/css" );
	tBodyPseudoCSS.setAttribute( "rel", "stylesheet" );

	// Create a pseudo body element for applying filters to the background image
	if ( window.getComputedStyle ) {
		var tBodyCSS = window.getComputedStyle( document.body, null );

		var tCSSToCopy = [ "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin",
			"background-position", "background-repeat", "background-size" ];

		tBodyPseudoCSS.innerHTML = "body:before{";

		tCSSToCopy.forEach( function(pStyle) {
			tBodyPseudoCSS.innerHTML += pStyle + ": " + tBodyCSS.getPropertyValue( pStyle ) + ";\n";
		} );

		tBodyPseudoCSS.innerHTML += "}";
	}

	document.body.appendChild( tBodyPseudoCSS );
}

/**
 * Remove all achromjs-specific filter classes from the DOM nodes
 */
achromajs.clearNodeClasses = function() {

	[].forEach.call( document.querySelectorAll( '[data-achromajs]' ), function(pNode) {

		Object.keys( achromajs.blindnessModes ).forEach( function(pModeName) {

			Object.keys( achromajs.blindnessModes[ pModeName ] ).forEach( function(pModeVariant) {
				pNode.classList.remove( "achromajs-" + pModeVariant );
				document.body.classList.remove( 'achromajs-' + pModeVariant + '-Body' );
			} );
		} );

		Object.keys( achromajs.contrastModes ).forEach( function(pModeName) {

			Object.keys( achromajs.contrastModes[ pModeName ] ).forEach( function(pModeVariant) {
				pNode.classList.remove( "achromajs-" + pModeVariant );
				document.body.classList.remove( 'achromajs-' + pModeVariant + '-Body' );
			} );
		} );

	} );
}

/**
 * Apply the selected color or contrast mode
 */
achromajs.setMode = function(pEvent, pModus, pVariant ) {

	var tModus = pModus;
	var tCurrentVariant = pVariant;
	
	if (pEvent != null)	{
		var tSender = pEvent.target;
		tModus = tSender.getAttribute( 'data-achromajs-modus' );
	}
	
	var tVariants = Object.keys( achromajs.contrastModes[tModus] || achromajs.blindnessModes[tModus] || {}); 
	
	if (tVariants.length == 0) {
		return;
	}
	
	achromajs.clearNodeClasses();
	
	var tNewVariant = "";

	[].forEach.call( document.querySelectorAll( '[data-achromajs]' ), function(pNode) {

		var tCurrentVariant = pNode.getAttribute( 'data-achromajs' );

		var tActiveVariantIndex = -1; 
		
		tVariants.forEach( function(pCurrent, pIndex) {
			if (pCurrent == tCurrentVariant) {
				tActiveVariantIndex = pVariant == undefined ? pIndex : pIndex - 1;
			}
		});
			
		if ( tActiveVariantIndex < tVariants.length - 1 ) {
			tNewVariant = tVariants[ tActiveVariantIndex + 1 ];
			pNode.classList.add( "achromajs-" + tNewVariant );
			pNode.setAttribute( 'data-achromajs', tNewVariant );
		} else {
			pNode.setAttribute( 'data-achromajs', '' );
			tModus = null;
		}
	} );
	
	document.body.classList.add( 'achromajs-' + tNewVariant + '-Body' );
	
	achromajs.localConfig.filter = tModus;
	achromajs.localConfig.variant = tNewVariant;
	
	achromajs.localConfig.save();
}

/**
 * Restore previously saved filter settings from cookie on page load
 */
achromajs.restoreFilter = function() {
	achromajs.setMode( null, achromajs.localConfig.filter, achromajs.localConfig.variant );
}

/**
 * Check if AchromaJS is enabled either via URL parameter or via cookie. The cookie is only set once the enabled URL
 * parameter was set for a domain.
 */
achromajs.isEnabled = function() {

	// Read URL parameters into JSON object
	var tURIParameters = window.location.search.substring( 1 ) ? JSON.parse( '{"'
		+ window.location.search.substring( 1 ).replace( /&/g, '","' ).replace( /=/g, '":"' ) + '"}', function(pKey, pValue) {
		return pKey === "" ? pValue : decodeURIComponent( pValue )
	} ) : {}

	achromajs.localConfig.load();

	// Set enabled cookie if parameter enable is set
	if ( tURIParameters.achromajs ) {
		achromajs.localConfig.enabled = tURIParameters.achromajs == "enable";
		achromajs.localConfig.save();
	}

	return achromajs.localConfig.enabled;
}

// todo: check if browser supports all JS magic
// todo: add popup info for each mode selector

