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

class AchromeaticPopup {
    constructor() {
    }

    public init() {
        // Inject the list of filters
        new FiltersUIList(document.getElementById('ActionList'), this.filterClicked)
    }

    /**
     * Handler when a filter was selected from the popup. 
     * First, store the selected filter CSS class for the current tab's domain, then apply it via the set_filter.js script.
     */
    filterClicked(ev: Event) {
        const selectedCSSClass = (<HTMLElement>ev.currentTarget).getAttribute('data-cssclass');
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tabId = tabs[0].id;
            const tabDomain = (new URL(tabs[0].url || '').host);

            chrome.storage.local.get('achromajsSelectedFilter', function (savedTabs) {

                const newSavedTabs = savedTabs && savedTabs.achromajsSelectedFilter ? savedTabs.achromajsSelectedFilter : {};

                newSavedTabs[tabDomain] = selectedCSSClass;

                chrome.storage.local.set({
                    achromajsSelectedFilter: newSavedTabs
                }, function () {
                    chrome.tabs.executeScript(
                        tabId || 0, {
                        code: `
                        var tabId=` + tabId + `;
                        var tabDomain='` + tabDomain + `';
                    `
                    }, function () {
                        chrome.tabs.executeScript(
                            tabId || 0, {
                            file: 'chrome/set_filter.js'
                        }, window.close)
                    });
                });
            });
        });
    }

}

/**
 * Inject the AchromJS popup wrapper into the document.body DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    const ajs = new AchromeaticPopup();
    ajs.init();
});
