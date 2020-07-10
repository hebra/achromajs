/**
 * Copyright 2015-2020 Hendrik Brandt
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * See file LICENSE for the full license.
 *
 * @author Hendrik Brandt
 *
 */

/**
 * Available vision filters and their related CSS classes to use.
 */
class FilterMode {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public cssClass: string) { }
}

/**
 * Holder class for all available filter modes, grouped by vision type.
 */

/* eslint no-unused-vars: "off" */
class Filters {
    reset: FilterMode[] = [];
    blur: FilterMode[] = [];
    contrast: FilterMode[] = [];
    achromato: FilterMode[] = [];
    prot: FilterMode[] = [];
    deuter: FilterMode[] = [];
    tritan: FilterMode[] = [];

    constructor() {
        this.reset.push(new FilterMode("NoFilter", "No Filter", "Display page without any filters applied", "achromajs-filter-none"))

        this.blur.push(new FilterMode("Blur1", "Light Blur", "A light blur of 1px radius", "achromajs-filter-blur1"))
        this.blur.push(new FilterMode("Blur2", "Medium Blur", "A medium blur of 2px radius", "achromajs-filter-blur2"))
        this.blur.push(new FilterMode("Blur3", "Strong Blur", "A strong blur of 3px radius", "achromajs-filter-blur3"))

        this.contrast.push(new FilterMode("Invert", "Invert Colours", "Invert all colours", "achromajs-filter-invert"))
        this.contrast.push(new FilterMode("LowContrast", "Low Contrast", "Apply a low contrast filter", "achromajs-filter-lowcontrast"))
        this.contrast.push(new FilterMode("HighContrast", "High Contrast", "Apply a high contrast filter", "achromajs-filter-highcontrast"))

        this.achromato.push(new FilterMode("Achromatomaly", "Achromatomaly", "Lacking most color vision (reduced color blind)", "achromajs-filter-achromatomaly"))
        this.achromato.push(new FilterMode("Achromatopsia", "Achromatopsia", "Lacking all color vision (no color blind)", "achromajs-filter-achromatopsia"))

        this.prot.push(new FilterMode("Protanomaly", "Protanomaly", "Poor red-green hue discrimination", "achromajs-filter-protanomaly"))
        this.prot.push(new FilterMode("Protanopia", "Protanopia", "Red-green colour blindness (red appears dark)", "achromajs-filter-protanopia"))

        this.deuter.push(new FilterMode("Deuteranomaly", "Deuteranomaly", "Lightly red-green hue discrimination", "achromajs-filter-deuteranomaly"))
        this.deuter.push(new FilterMode("Deuteranopia", "Deuteranopia", "Moderate red-green hue discrimination", "achromajs-filter-deuteranopia"))

        this.tritan.push(new FilterMode("Tritanomaly", "Tritanomaly", "Low blue-yellow hue discrimination", "achromajs-filter-tritanomaly"))
        this.tritan.push(new FilterMode("Tritanopia", "Tritanopia", "Absence of blue retinal receptors", "achromajs-filter-tritanopia"))
    }

    /**
     * Return an array of all FilterMode arrays defined in Filters.
     */
    public static getAll(): FilterMode[][] {
        const f = new Filters()
        return [f.reset, f.blur, f.contrast, f.achromato, f.prot, f.deuter, f.tritan]
    }
}
