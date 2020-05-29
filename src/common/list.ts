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

/// <reference path="./modes.ts" />

/**
 * Build the HTML list of available filters, pre-select the last selected one and inject the new HTML code into the parent object.
 */
class FiltersUIList {
    constructor(private listContainer: HTMLElement | null) {
    }

    build(clickCallback: any, savedSiteFilters?: any) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabDomain = (new URL(tabs[0].url || '').host);

            const currentTabFilter = savedSiteFilters ? savedSiteFilters[tabDomain] : null;

            Filters.getAll().forEach((section) => {

                if (this.listContainer === null) {
                    console.error('List holder element is null.');
                    return;
                }

                this.listContainer.append(document.createElement('hr'));

                section.forEach((mode) => {
                    const input = document.createElement('input');

                    input.value = mode.id;
                    input.id = mode.id;
                    input.name = 'Action';
                    input.type = 'radio';
                    input.checked = currentTabFilter && currentTabFilter == mode.cssClass;

                    const label = document.createElement('label');
                    label.innerHTML = mode.name;
                    label.htmlFor = mode.id;

                    const li = document.createElement('li');
                    li.append(input);
                    li.append(label);
                    li.title = mode.description;

                    li.setAttribute('data-mode', mode.id);
                    li.setAttribute('data-cssclass', mode.cssClass);
                    li.onclick = clickCallback;


                    if (this.listContainer !== null) {
                        this.listContainer.append(li);
                    }

                });
            });
        });



    }

}
