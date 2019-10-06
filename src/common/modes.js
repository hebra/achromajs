const modes = {
	'reset': [
		{
			'id': 'NoFilter',
			'name': 'No Filter',
			'description': 'Display page without any filters applied',
			'cssClass': 'achromajs-filter-none'
		}],
	'blur': [
		{
			'id': 'Blur1',
			'name': 'Light Blur',
			'description': 'A light blur of 1px radius',
			'cssClass': 'achromajs-filter-blur1'
		},
		{
			'id': 'Blur2',
			'name': 'Medium Blur',
			'description': 'A medium blur of 2px radius',
			'cssClass': 'achromajs-filter-blur2'
		},
		{
			'id': 'Blur3',
			'name': 'Strong Blur',
			'description': 'A strong blur of 3px radius',
			'cssClass': 'achromajs-filter-blur3'
		}
	],
	'contrast': [
		{
			'id': 'Invert',
			'name': 'Invert Colours',
			'description': 'Invert all colours',
			'cssClass': 'achromajs-filter-invert'
		},
		{
			'id': 'LowContrast',
			'name': 'Low Contrast',
			'description': 'Apply a low contrast filter',
			'cssClass': 'achromajs-filter-lowcontrast'
		},
		{
			'id': 'HighContrast',
			'name': 'High Contrast',
			'description': 'Apply a high contrast filter',
			'cssClass': 'achromajs-filter-highcontrast'
		}
	],
	'achromato': [
		{
			'id': 'Achromatomaly',
			'name': 'Achromatomaly',
			'description': 'Lacking most color vision (reduced color blind)',
			'cssClass': 'achromajs-filter-achromatomaly'
		},
		{
			'id': 'Achromatopsia',
			'name': 'Achromatopsia',
			'description': 'Lacking all color vision (no color blind)',
			'cssClass': 'achromajs-filter-achromatopsia'
		}
	],
	'prot': [
		{
			'id': 'Protanomaly',
			'name': 'Protanomaly',
			'description': 'Poor red-green hue discrimination',
			'cssClass': 'achromajs-filter-protanomaly'
		},
		{
			'id': 'Protanopia',
			'name': 'Protanopia',
			'description': 'Red-green colour blindness (red appears dark)',
			'cssClass': 'achromajs-filter-protanopia'
		}
	],
	'deuter': [
		{
			'id': 'Deuteranomaly',
			'name': 'Deuteranomaly',
			'description': 'Lightly red-green hue discrimination',
			'cssClass': 'achromajs-filter-deuteranomaly'
		},
		{
			'id': 'Deuteranopia',
			'name': 'Deuteranopia',
			'description': 'Moderate red-green hue discrimination',
			'cssClass': 'achromajs-filter-deuteranopia'
		}
	],
	'tritan': [
		{
			'id': 'Tritanomaly',
			'name': 'Tritanomaly',
			'description': 'Low blue-yellow hue discrimination',
			'cssClass': 'achromajs-filter-tritanomaly'
		},
		{
			'id': 'Tritanopia',
			'name': 'Tritanopia',
			'description': 'Absence of blue retinal receptors',
			'cssClass': 'achromajs-filter-tritanopia'
		}
	],

};
