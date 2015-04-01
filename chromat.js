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
 */

/**
 * @author Hendrik Brandt
 * @version 15.03
 * 
 */

var chromatjs = window.chromatjs || {}

// chromatjs.modes = [ "normal", "blur", "invert", "lowcontrast", ,
// "highcontrast"

chromatjs.blindnessModes = {
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

chromatjs.inject = function()
{
	// Add an additional data attribute to all body root children to retrieve
	// them easier later on
	Array.prototype.slice.call(document.body.childNodes, 0).forEach(

	function(pNode)
	{
		if (pNode.nodeName != '#text' && pNode.nodeName != '#comment')
		{
			pNode.setAttribute("data-chromatjs", "NORMAL");
		}
	});

	// Create and inject a new root div to the body element which holds
	// the ChromatJS icons and selector list
	var tContainer = document.createElement('div');
	tContainer.setAttribute('id', 'CHROMATIC_TRIGGER')
	tContainer.setAttribute('tabindex', '0')
	tContainer.innerHTML = '<span></span>';

	var tList = document.createElement('ul');

	var tBlindCSS = document.createElement('style');
	tBlindCSS.type = 'text/css';
	tBlindCSS.rel = 'stylesheet';

	// Create the list of blindness selectors
	// and of CSS style filters for each variant
	Object.keys(chromatjs.blindnessModes).forEach(

	function(pModeName)
	{

		// Create a selector
		var tItem = document.createElement('li');
		tItem.setAttribute("data-chromatjs-modus", pModeName);
		tItem.innerHTML = pModeName;
		tItem.addEventListener("click", chromatjs.setMode);

		var tVariantsList = "";

		Object.keys(chromatjs.blindnessModes[pModeName]).forEach(

		function(pModeVariant)
		{
			tVariantsList += pModeVariant + " ";
		});

		tItem.setAttribute("data-chromatjs-modus-variants", tVariantsList);

		tList.appendChild(tItem);

	});

	tContainer.appendChild(tList);

	document.body.appendChild(tContainer);

	// Define extra pseudo-element styles for body background

	var tBodyPseudoCSS = document.createElement('style');
	tBodyPseudoCSS.setAttribute("id", "CHROMATJS_BODY_CSS");
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

chromatjs.setMode = function(pEvent)
{

	var tSender = pEvent.target;
	var tModus = tSender.getAttribute('data-chromatjs-modus');
	var tCurrentVariant = tSender
			.getAttribute("data-chromatjs-selected-variant");
	var tVariants = tSender.getAttribute("data-chromatjs-modus-variants")
			.split(" ");

	Array.prototype.slice
			.call(document.querySelectorAll('[data-chromatjs]'), 0).forEach(

			function(pNode)
			{

				Object.keys(chromatjs.blindnessModes).forEach(

				function(pModeName)
				{
					// First remove already applied
					// chromatjs CSS classes
					Object.keys(chromatjs.blindnessModes[pModeName]).forEach(

					function(pModeVariant)
					{
						pNode.classList.remove("chromatjs-" + pModeVariant);
						document.body.classList.remove('chromatjs-'+ pModeVariant +'-Body');
					});
				});

				tCurrentVariant = pNode.getAttribute('data-chromatjs');

				if (tCurrentVariant == tVariants[1])
				{
					pNode.setAttribute('data-chromatjs', '');
				}
				else if (tCurrentVariant == tVariants[0])
				{
					pNode.classList.add("chromatjs-" + tVariants[1]);
					pNode.setAttribute('data-chromatjs', tVariants[1]);
					document.body.classList.add('chromatjs-'+ tVariants[1]+'-Body');
				}
				else
				{
					pNode.classList.add("chromatjs-" + tVariants[0]);
					pNode.setAttribute('data-chromatjs', tVariants[0]);
					document.body.classList.add('chromatjs-'+ tVariants[0]+'-Body');
				}
			});
}

document.addEventListener("DOMContentLoaded", function(event)
{
	console.log("Injecting ChromatJS into DOM.");
	chromatjs.inject();
});
