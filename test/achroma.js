"use strict";
class FilterMode {
    constructor(id, name, description, cssClass) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cssClass = cssClass;
    }
}
class Filters {
    constructor() {
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
    static getAll() {
        const f = new Filters();
        return [f.reset, f.blur, f.contrast, f.achromato, f.prot, f.deuter, f.tritan];
    }
}
class FiltersUIList {
    constructor(listContainer) {
        this.listContainer = listContainer;
    }
    build(clickCallback, tabs, savedSiteFilters) {
        const tabDomain = (new URL(tabs[0].url || '').host);
        let currentTabFilter = savedSiteFilters ? savedSiteFilters[tabDomain] : 'achromajs-filter-none';
        currentTabFilter = currentTabFilter || 'achromajs-filter-none';
        Filters.getAll().forEach((section, idx) => {
            if (this.listContainer === null) {
                console.error('List holder element is null.');
                return;
            }
            if (idx > 0) {
                this.listContainer.append(document.createElement('hr'));
            }
            section.forEach((mode) => {
                const item = document.createElement('div');
                item.className = "panel-list-item";
                item.innerHTML =
                    `<div class="icon"><input type="radio" id="${mode.id}" name="Action" value="${mode.id}" ${currentTabFilter == mode.cssClass ? 'checked' : ''}/></div>
                     <div class="text"><label for="${mode.id}">${mode.name}</label></div>
                     <div class="text-shortcut"></div>`;
                item.title = mode.description;
                item.setAttribute('data-mode', mode.id);
                item.setAttribute('data-cssclass', mode.cssClass);
                item.onclick = clickCallback;
                if (this.listContainer !== null) {
                    this.listContainer.append(item);
                }
            });
        });
    }
}
class AchromaJS {
    constructor() {
        this.minifiedCSS = `.background-color{background:#f1f1f1}\n.achromajs-wrapper{font-family:sans-serif;position:absolute;top:0;left:calc(50vw - 100px);width:200px;height:auto}.achromajs-icon{position:absolute;z-index:999999;top:-42px;border:none;width:64px;height:64px;left:calc(50vw - 32px);cursor:pointer;transition:top .5s ease-in}.achromajs-icon:hover{top:-16px;transition:top .5s ease-in}\n.achromajs-filter-none{filter:none}.achromajs-filter-blur1{filter:blur(1px)}.achromajs-filter-blur2{filter:blur(2px)}.achromajs-filter-blur3{filter:blur(3px)}.achromajs-filter-achromatomaly{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuNjE4IDAuMzIgMC4wNjIgMCAwIDAuMTYzIDAuNzc1IDAuMDYyIDAgMCAwLjE2MyAwLjMyIDAuNTE2IDAgMCAwIDAgMCAxIDAiLz4KICAgIDwvZmlsdGVyPgo8L3N2Zz4K#Filter)}.achromajs-filter-achromatopsia{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuMjk5IDAuNTg3IDAuMTE0IDAgMCAwLjI5OSAwLjU4NyAwLjExNCAwIDAgMC4yOTkgMC41ODcgMC4xMTQgMCAwIDAgMCAwIDEgMCIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPgo=#Filter)}.achromajs-filter-deuteranopia{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuNjI1IDAuMzc1IDAgMCAwIDAuNyAwLjMgMCAwIDAgMCAwLjMgMC43IDAgMCAwIDAgMCAxIDAiLz4KICAgIDwvZmlsdGVyPgo8L3N2Zz4K#Filter)}.achromajs-filter-deuteranomaly{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuOCAwLjIgMCAwIDAgMC4yNTggMC43NDIgMCAwIDAgMCAwLjE0MiAwLjg1OCAwIDAgMCAwIDAgMSAwIi8+CiAgICA8L2ZpbHRlcj4KPC9zdmc+Cg==#Filter)}.achromajs-filter-invert{filter:invert(100%)}.achromajs-filter-lowcontrast{filter:contrast(.2)}.achromajs-filter-highcontrast{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgPGZpbHRlciBpZD0iRmlsdGVyIj4KICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIgcmVzdWx0PSJkZXNhdCIvPgogICAgICA8ZmVDb21wb25lbnRUcmFuc2Zlcj4KICAgICAgICA8ZmVGdW5jUiB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAuOCAuOSAxIiAvPgogICAgICAgIDxmZUZ1bmNHIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIC44IC45IDEiIC8+CiAgICAgICAgPGZlRnVuY0IgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgLjggLjkgMSIgLz4KICAgICAgPC9mZUNvbXBvbmVudFRyYW5zZmVyPgogICAgPC9maWx0ZXI+Cjwvc3ZnPgo=#Filter)}.achromajs-filter-protanomaly{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuODE3IDAuMTgzIDAgMCAwIDAuMzMzIDAuNjY3IDAgMCAwIDAgMC4xMjUgMC44NzUgMCAwIDAgMCAwIDEgMCIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPgo=#Filter)}.achromajs-filter-protanopia{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuNTY3IDAuNDMzIDAgMCAwIDAuNTU4IDAuNDQyIDAgMCAwIDAgMC4yNDIgMC43NTggMCAwIDAgMCAwIDEgMCIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPgo=#Filter)}.achromajs-filter-tritanopia{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuOTUgMC4wNSAwIDAgMCAwIDAuNDMzIDAuNTY3IDAgMCAwIDAuNDc1IDAuNTI1IDAgMCAwIDAgMCAxIDAiLz4KICAgIDwvZmlsdGVyPgo8L3N2Zz4K#Filter)}.achromajs-filter-tritanomaly{filter:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmaWx0ZXIgaWQ9IkZpbHRlciI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuOTY3IDAuMDMzIDAgMCAwIDAgMC43MzMgMC4yNjcgMCAwIDAgMC4xODMgMC44MTcgMCAwIDAgMCAwIDEgMCIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPgo=#Filter)}`;
    }
    isEnabled() {
        if (!window.localStorage) {
            return false;
        }
        const query = new URL(document.location.href).searchParams.get('achromajs');
        if (query == 'true' || query == '1') {
            localStorage.setItem('AchromaJSEnabled', 'true');
            console.info('Enabling AchromaJS');
        }
        else if (query == 'false' || query == '0') {
            localStorage.setItem('AchromaJSEnabled', 'false');
            console.info('Disabling AchromaJS');
        }
        return localStorage.getItem('AchromaJSEnabled') == 'true';
    }
    init() {
        const style = document.createElement('style');
        style.innerHTML = this.minifiedCSS;
        document.body.append(style);
        const wrapper = document.createElement('div');
        wrapper.classList.add('achromajs-wrapper');
        wrapper.classList.add('background-color');
        new FiltersUIList(wrapper).build(this.filterClicked, undefined);
        document.body.append(wrapper);
        const icon = document.createElement('img');
        icon.src = ' data:image/png;base64,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';
        icon.classList.add('achromajs-icon');
        document.body.append(icon);
    }
    filterClicked(ev) {
        console.log(ev);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const ajs = new AchromaJS();
    if (ajs.isEnabled()) {
        ajs.init();
    }
});
//# sourceMappingURL=achroma.js.map