/*! AchromaJS - v15.4.1 - 2015-04-06
* Copyright (c) 2015 Hendrik Brandt; Licensed Apache, CC-BY-SA */
/**
 * @author Hendrik Brandt
 * @version 15.04
 * 
 */

var achromajs = window.achromajs || {}

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

achromajs.inject = function() {

	// Check if touch-based
	document.documentElement.className += ( ( "ontouchstart" in document.documentElement ) ? ' achromajs-touch' : '' );

	// Add an additional data attribute to all body root children to retrieve
	// them easier later on
	Array.prototype.slice.call( document.body.childNodes, 0 ).forEach(

	function(pNode) {
		if ( pNode.nodeName != '#text' && pNode.nodeName != '#comment' ) {
			pNode.setAttribute( "data-achromajs", "NORMAL" );
		}
	} );

	// Create and inject a new root div to the body element which holds
	// the achromajs icons and selector list
	var tContainer = document.createElement( 'div' );
	tContainer.setAttribute( 'id', 'ACHROMAJS_CONTAINER' )

	// Create the left blur and contrast mode selection list
	var tContrastModeList = document.createElement( 'ul' );

	[ "blur", "lowcontrast", "highcontrast", "invert" ].forEach( function(pModeName) {
		// Create a selector
		var tItem = document.createElement( 'li' );
		tItem.setAttribute( "data-achromajs-modus", pModeName );
		tItem.addEventListener( "click", achromajs.setContrast );

		tContrastModeList.appendChild( tItem );
	} );

	// Create the right color mode selection list
	var tColorModeList = document.createElement( 'ul' );

	var tBlindCSS = document.createElement( 'style' );
	tBlindCSS.type = 'text/css';
	tBlindCSS.rel = 'stylesheet';

	// Create the list of blindness selectors
	// and of CSS style filters for each variant
	Object.keys( achromajs.blindnessModes ).forEach( function(pModeName) {
		// Create a selector
		var tItem = document.createElement( 'li' );
		tItem.setAttribute( "data-achromajs-modus", pModeName );
		tItem.addEventListener( "click", achromajs.setMode );

		var tVariantsList = "";

		Object.keys( achromajs.blindnessModes[ pModeName ] ).forEach(

		function(pModeVariant) {
			tVariantsList += pModeVariant + " ";
		} );

		tItem.setAttribute( "data-achromajs-modus-variants", tVariantsList );

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

	// Apply the selected filter also to the pseudo element body CSS
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

achromajs.setMode = function(pEvent) {

	var tSender = pEvent.target;
	var tModus = tSender.getAttribute( 'data-achromajs-modus' );
	var tCurrentVariant = tSender.getAttribute( "data-achromajs-selected-variant" );
	var tVariants = tSender.getAttribute( "data-achromajs-modus-variants" ).split( " " );

	Array.prototype.slice.call( document.querySelectorAll( '[data-achromajs]' ), 0 ).forEach(

	function(pNode) {

		Object.keys( achromajs.blindnessModes ).forEach(

		function(pModeName) {
			// First remove already applied
			// achromajs CSS classes
			Object.keys( achromajs.blindnessModes[ pModeName ] ).forEach(

			function(pModeVariant) {
				pNode.classList.remove( "achromajs-" + pModeVariant );
				document.body.classList.remove( 'achromajs-' + pModeVariant + '-Body' );
			} );
		} );

		tCurrentVariant = pNode.getAttribute( 'data-achromajs' );

		if ( tCurrentVariant == tVariants[ 1 ] ) {
			pNode.setAttribute( 'data-achromajs', '' );
		} else if ( tCurrentVariant == tVariants[ 0 ] ) {
			pNode.classList.add( "achromajs-" + tVariants[ 1 ] );
			pNode.setAttribute( 'data-achromajs', tVariants[ 1 ] );
			document.body.classList.add( 'achromajs-' + tVariants[ 1 ] + '-Body' );
		} else {
			pNode.classList.add( "achromajs-" + tVariants[ 0 ] );
			pNode.setAttribute( 'data-achromajs', tVariants[ 0 ] );
			document.body.classList.add( 'achromajs-' + tVariants[ 0 ] + '-Body' );
		}
	} );
}

achromajs.setContrast = function(pEvent) {
	var tSender = pEvent.target;
	var tSelected = tSender.getAttribute( "data-achromajs-modus" );

	Array.prototype.slice.call( document.querySelectorAll( '[data-achromajs]' ), 0 ).forEach(

	function(pNode) {
		[ "blur-1", "blur-2", "blur-3", "lowcontrast", "highcontrast", "invert" ].forEach( function(pModeName) {
			pNode.classList.remove( "achromajs-" + pModeName );
			document.body.classList.remove( 'achromajs-' + pModeName + '-Body' );
		} );

		if ( tSelected == "blur" ) {
			var tCurrentBlurLevel = ( pNode.getAttribute( "data-achromajs-blur-level" ) || "0" ) * 1;

			if ( tCurrentBlurLevel < 3 ) {
				var tNewBlurLevel = tCurrentBlurLevel + 1;

				pNode.classList.add( "achromajs-" + tSelected + "-" + tNewBlurLevel );
				document.body.classList.add( 'achromajs-' + tSelected + "-" + tNewBlurLevel + '-Body' );

				pNode.setAttribute( "data-achromajs-blur-level", tNewBlurLevel );
				document.body.setAttribute( "data-achromajs-blur-level", tNewBlurLevel );

			} else {
				pNode.setAttribute( "data-achromajs-blur-level", 0 );
				document.body.setAttribute( "data-achromajs-blur-level", 0 );
			}
		} else if ( document.body.getAttribute( "achromajs-current-contrast" ) != tSelected ) {
			pNode.classList.add( "achromajs-" + tSelected );
			document.body.classList.add( 'achromajs-' + tSelected + '-Body' );
			pNode.setAttribute( "data-achromajs-blur-level", 0 );
			document.body.setAttribute( "data-achromajs-blur-level", 0 );
		}

	} );

	if ( document.body.getAttribute( "achromajs-current-contrast" ) != tSelected ) {
		document.body.setAttribute( "achromajs-current-contrast", tSelected );
	} else {
		document.body.setAttribute( "achromajs-current-contrast", "" );
	}
}

achromajs.isEnabled = function() {

	// Read URL parameters into JSON object
	var tURIParameters = window.location.search.substring( 1 ) ? JSON.parse( '{"'
		+ window.location.search.substring( 1 ).replace( /&/g, '","' ).replace( /=/g, '":"' ) + '"}', function(pKey, pValue) {
		return pKey === "" ? pValue : decodeURIComponent( pValue )
	} ) : {}

	// Set enabled cookie if parameter enable is set
	if ( tURIParameters.achromajs && tURIParameters.achromajs == "enable" ) {
		document.cookie = "achromajs=" + ( tURIParameters.achromajs == "enable" ? "enable" : "disable" ) + "; expires=Thu, 31 Dec 2099 12:00:00 UTC; path=/";
	}

	var tCookies = JSON.parse( '{' + document.cookie.replace( /=/g, ':' ).replace( /; /g, '","' ).replace( /\w+/g, '"$&"' ) + '}' );

	return tCookies.achromajs && tCookies.achromajs == "enable";
}

document.addEventListener( "DOMContentLoaded", function(event) {
	console.log( "Check if achromajs is enabled via URL or cookie." );
	if ( achromajs.isEnabled() ) {
		console.log( "Injecting achromajs into DOM." );
		achromajs.inject();
		achromajs.webkitSvgPathFix();
	}
} );

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

		var tPath = tCSSLink.href.replace( /achroma(.*)\.css/g, '' );

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
