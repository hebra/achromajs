/**
 * Copyright 2015-2019 Hendrik Brandt
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
 * See file LICENSE for the full license.
 * 
 * @author Hendrik Brandt
 *
 */
/// <reference path="../common/list.ts" />

class AchromaJS {

    private minifiedCSS: string = `PLACEHOLDER_FILTER_CSS`;


    constructor() {
    }

    /**
     * Check in the DOM local storage if AchromaJS is enabled.
     * This check is per domain.
     * If the query paramter 'achromajs' is set to true or 1 the feature will be enabled and the satus will be stored in the localStorage.
     * If the parameter is set to 'false' or '0' it will be disabled.
     * If not provided or set to any other value the currently saved value from localStorage will be used.
    */
    public isEnabled(): boolean {
        if (!window.localStorage) {
            return false;
        }

        const query = new URL(document.location.href).searchParams.get('achromajs');

        if (query == 'true' || query == '1') {
            localStorage.setItem('AchromaJSEnabled', 'true');
            console.info('Enabling AchromaJS');
        } else if (query == 'false' || query == '0') {
            // If the query parameter achromajs is set to false, disable AchromaJS
            localStorage.setItem('AchromaJSEnabled', 'false');
            console.info('Disabling AchromaJS');
        }

        return localStorage.getItem('AchromaJSEnabled') == 'true';
    }

    public init() {
        // Append a new style element to the body containing the minified AchromaJS styles and filters
        const style = document.createElement('style');
        style.innerHTML = this.minifiedCSS;
        document.body.append(style);

        // Inject the list of filters
        const wrapper = document.createElement('div');
        wrapper.classList.add('achromajs-wrapper');
        wrapper.classList.add('background-color');
        new FiltersUIList(wrapper).build(this.filterClicked, undefined);
        document.body.append(wrapper);

        // Toggle Icon
        const icon = document.createElement('img');
        icon.src = ' data:image/png;base64,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';
        icon.classList.add('achromajs-icon');
        document.body.append(icon);
    }

    filterClicked(ev: Event) {
        console.log(ev);
    }

}

/**
 * Inject the AchromJS popup wrapper into the document.body DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    const ajs = new AchromaJS();
    if (ajs.isEnabled()) {
        ajs.init();
    }
});
