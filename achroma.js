/**
 * Copyright 2015 Hendrik Brandt
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * See file LICENSE-Apache-2.0 for the full license.
 */

/**
 * @author Hendrik Brandt
 * @version 15.04
 * 
 */

var achromajs = window.achromajs || {}

achromajs.blindnessModes = {
	'achromato' : {
		'Achromatomaly' : 'Lacking most color vision',
		'Achromatopsia' : 'Lacking all color vision (aka color blind)'
	},
	'prot' : {
		'Protanomaly' : 'poor red-green hue discrimination',
		'Protanopia' : 'red appears dark'
	},
	'deuter' : {
		'Deuteranomaly' : 'lightly red-green hue discrimination',
		'Deuteranopia' : 'moderate red-green hue discrimination'
	},
	'tritan' : {
		'Tritanomaly' : 'Low blue-yellow hue discrimination',
		'Tritanopia' : 'Absence of blue retinal receptors'
	}
};

achromajs.inject = function()
{
	// Add an additional data attribute to all body root children to retrieve
	// them easier later on
	Array.prototype.slice.call(document.body.childNodes, 0).forEach(

	function(pNode)
	{
		if (pNode.nodeName != '#text' && pNode.nodeName != '#comment')
		{
			pNode.setAttribute("data-achromajs", "NORMAL");
		}
	});

	// Create and inject a new root div to the body element which holds
	// the achromajs icons and selector list
	var tContainer = document.createElement('div');
	tContainer.setAttribute('id', 'ACHROMAJS_CONTAINER')

	// Create the left blur and contrast mode selection list
	var tContrastModeList = document.createElement('ul');

	[ "blur", "lowcontrast", "highcontrast", "invert" ].forEach(function(
			pModeName)
	{
		// Create a selector
		var tItem = document.createElement('li');
		tItem.setAttribute("data-achromajs-modus", pModeName);
		tItem.addEventListener("click", achromajs.setContrast);

		tContrastModeList.appendChild(tItem);
	});

	// Create the right color mode selection list
	var tColorModeList = document.createElement('ul');

	var tBlindCSS = document.createElement('style');
	tBlindCSS.type = 'text/css';
	tBlindCSS.rel = 'stylesheet';

	// Create the list of blindness selectors
	// and of CSS style filters for each variant
	Object.keys(achromajs.blindnessModes).forEach(function(pModeName)
	{
		// Create a selector
		var tItem = document.createElement('li');
		tItem.setAttribute("data-achromajs-modus", pModeName);
		tItem.addEventListener("click", achromajs.setMode);

		var tVariantsList = "";

		Object.keys(achromajs.blindnessModes[pModeName]).forEach(

		function(pModeVariant)
		{
			tVariantsList += pModeVariant + " ";
		});

		tItem.setAttribute("data-achromajs-modus-variants", tVariantsList);

		tColorModeList.appendChild(tItem);
	});

	tContainer.appendChild(tContrastModeList);
	tContainer.appendChild(document.createElement('span'));
	tContainer.appendChild(tColorModeList);

	var tWrapper = document.createElement('div')
	tWrapper.setAttribute('id', 'ACHROMAJS_WRAPPER')

	tWrapper.appendChild(tContainer);

	document.body.appendChild(tWrapper);

	// Define extra pseudo-element styles for body background

	var tBodyPseudoCSS = document.createElement('style');
	tBodyPseudoCSS.setAttribute("id", "achromajs_BODY_CSS");
	tBodyPseudoCSS.setAttribute("type", "text/css");
	tBodyPseudoCSS.setAttribute("rel", "stylesheet");

	// Apply the selected filter also to the pseudo element body CSS
	if (window.getComputedStyle)
	{
		var tBodyCSS = window.getComputedStyle(document.body, null);

		var tCSSToCopy = [ "background-attachment", "background-blend-mode",
				"background-clip", "background-color", "background-image",
				"background-origin", "background-position",
				"background-repeat", "background-size" ];

		tBodyPseudoCSS.innerHTML = "body:before{";

		tCSSToCopy.forEach(function(pStyle)
		{
			tBodyPseudoCSS.innerHTML += pStyle + ": "
					+ tBodyCSS.getPropertyValue(pStyle) + ";\n";
		});

		tBodyPseudoCSS.innerHTML += "}";
	}

	document.body.appendChild(tBodyPseudoCSS);
}

achromajs.setMode = function(pEvent)
{

	var tSender = pEvent.target;
	var tModus = tSender.getAttribute('data-achromajs-modus');
	var tCurrentVariant = tSender
			.getAttribute("data-achromajs-selected-variant");
	var tVariants = tSender.getAttribute("data-achromajs-modus-variants")
			.split(" ");

	Array.prototype.slice
			.call(document.querySelectorAll('[data-achromajs]'), 0)
			.forEach(

					function(pNode)
					{

						Object
								.keys(achromajs.blindnessModes)
								.forEach(

										function(pModeName)
										{
											// First remove already applied
											// achromajs CSS classes
											Object
													.keys(
															achromajs.blindnessModes[pModeName])
													.forEach(

															function(
																	pModeVariant)
															{
																pNode.classList
																		.remove("achromajs-"
																				+ pModeVariant);
																document.body.classList
																		.remove('achromajs-'
																				+ pModeVariant
																				+ '-Body');
															});
										});

						tCurrentVariant = pNode.getAttribute('data-achromajs');

						if (tCurrentVariant == tVariants[1])
						{
							pNode.setAttribute('data-achromajs', '');
						}
						else if (tCurrentVariant == tVariants[0])
						{
							pNode.classList.add("achromajs-" + tVariants[1]);
							pNode.setAttribute('data-achromajs', tVariants[1]);
							document.body.classList.add('achromajs-'
									+ tVariants[1] + '-Body');
						}
						else
						{
							pNode.classList.add("achromajs-" + tVariants[0]);
							pNode.setAttribute('data-achromajs', tVariants[0]);
							document.body.classList.add('achromajs-'
									+ tVariants[0] + '-Body');
						}
					});
}

achromajs.setContrast = function(pEvent)
{
	var tSender = pEvent.target;
	var tSelected = tSender.getAttribute("data-achromajs-modus");

	console.log(tSelected)
	console.log(document.body.getAttribute("achromajs-current-contrast"))

	Array.prototype.slice
			.call(document.querySelectorAll('[data-achromajs]'), 0)
			.forEach(

					function(pNode)
					{

						[ "blur", "lowcontrast", "highcontrast", "invert" ]
								.forEach(function(pModeName)
								{
									pNode.classList.remove("achromajs-"
											+ pModeName);
									document.body.classList.remove('achromajs-'
											+ pModeName + '-Body');
								});

						if (document.body
								.getAttribute("achromajs-current-contrast") != tSelected)
						{
							pNode.classList.add("achromajs-" + tSelected);
							document.body.classList.add('achromajs-'
									+ tSelected + '-Body');
						}

					});

	if (document.body.getAttribute("achromajs-current-contrast") != tSelected)
	{
		document.body.setAttribute("achromajs-current-contrast", tSelected);
	}
	else
	{
		document.body.setAttribute("achromajs-current-contrast", "");
	}
}

achromajs.isEnabled = function()
{
	
	return true;
}

document.addEventListener("DOMContentLoaded", function(event)
{
	console.log("Check if achromajs is enabled via URL or cookie.");
	if ( achromajs.isEnabled() ) {
		console.log("Injecting achromajs into DOM.");
		achromajs.inject();
	}
});
