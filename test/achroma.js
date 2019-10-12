"use strict";
var FilterMode = (function () {
    function FilterMode(id, name, description, cssClass) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cssClass = cssClass;
    }
    return FilterMode;
}());
var Filters = (function () {
    function Filters() {
        this.reset = [];
        this.blur = [];
        this.contrast = [];
        this.achromato = [];
        this.prot = [];
        this.deuter = [];
        this.tritan = [];
        this.reset.push(new FilterMode('NoFilter', 'No Filter', 'Display page without any filters applied', 'achromajs-filter-none'));
        this.blur.push(new FilterMode('Blur1', 'Light Blur', 'A light blur of 1px radius', 'achromajs-filter-blur1'));
        this.blur.push(new FilterMode('Blur2', 'Medium Blur', 'A medium blur of 2px radius', 'achromajs-filter-blur2'));
        this.blur.push(new FilterMode('Blur3', 'Strong Blur', 'A strong blur of 3px radius', 'achromajs-filter-blur3'));
        this.contrast.push(new FilterMode('Invert', 'Invert Colours', 'Invert all colours', 'achromajs-filter-invert'));
        this.contrast.push(new FilterMode('LowContrast', 'Low Contrast', 'Apply a low contrast filter', 'achromajs-filter-lowcontrast'));
        this.contrast.push(new FilterMode('HighContrast', 'High Contrast', 'Apply a high contrast filter', 'achromajs-filter-highcontrast'));
        this.achromato.push(new FilterMode('Achromatomaly', 'Achromatomaly', 'Lacking most color vision (reduced color blind)', 'achromajs-filter-achromatomaly'));
        this.achromato.push(new FilterMode('Achromatopsia', 'Achromatopsia', 'Lacking all color vision (no color blind)', 'achromajs-filter-achromatopsia'));
        this.prot.push(new FilterMode('Protanomaly', 'Protanomaly', 'Poor red-green hue discrimination', 'achromajs-filter-protanomaly'));
        this.prot.push(new FilterMode('Protanopia', 'Protanopia', 'Red-green colour blindness (red appears dark)', 'achromajs-filter-protanopia'));
        this.deuter.push(new FilterMode('Deuteranomaly', 'Deuteranomaly', 'Lightly red-green hue discrimination', 'achromajs-filter-deuteranomaly'));
        this.deuter.push(new FilterMode('Deuteranopia', 'Deuteranopia', 'Moderate red-green hue discrimination', 'achromajs-filter-deuteranopia'));
        this.tritan.push(new FilterMode('Tritanomaly', 'Tritanomaly', 'Low blue-yellow hue discrimination', 'achromajs-filter-tritanomaly'));
        this.tritan.push(new FilterMode('Tritanopia', 'Tritanopia', 'Absence of blue retinal receptors', 'achromajs-filter-tritanopia'));
    }
    Filters.getAll = function () {
        var f = new Filters();
        return [f.reset, f.blur, f.contrast, f.achromato, f.prot, f.deuter, f.tritan];
    };
    return Filters;
}());
var FiltersUIList = (function () {
    function FiltersUIList(listContainer) {
        var _this = this;
        this.listContainer = listContainer;
        Filters.getAll().forEach(function (section) {
            if (_this.listContainer === null) {
                console.error('List holder element is null.');
                return;
            }
            _this.listContainer.append(document.createElement('hr'));
            section.forEach(function (mode) {
                var input = document.createElement('input');
                input.value = mode.id;
                input.id = mode.id;
                input.name = 'Action';
                input.type = 'radio';
                var label = document.createElement('label');
                label.innerHTML = mode.name;
                label.htmlFor = mode.id;
                var li = document.createElement('li');
                li.append(input);
                li.append(label);
                li.title = mode.description;
                li.setAttribute('data-mode', mode.id);
                li.setAttribute('data-cssclass', mode.cssClass);
                li.onclick = _this.clickHandler;
                if (_this.listContainer !== null) {
                    _this.listContainer.append(li);
                }
            });
        });
    }
    FiltersUIList.prototype.clickHandler = function (ev) {
        console.log('click', ev);
    };
    return FiltersUIList;
}());
var AchromaJS = (function () {
    function AchromaJS() {
        this.list = new FiltersUIList(document.body);
    }
    AchromaJS.init = function () {
        new AchromaJS();
    };
    return AchromaJS;
}());
document.addEventListener('DOMContentLoaded', function (event) {
    AchromaJS.init();
});
//# sourceMappingURL=achroma.js.map