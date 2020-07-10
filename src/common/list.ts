/**
 * Copyright 2015-2020 Hendrik Brandt
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

/* eslint no-unused-vars: "off" */
class FiltersUIList {
    constructor(private listContainer: HTMLElement | null) {
    }

    build(clickCallback: any, tabs: any, savedSiteFilters?: any) {
        const tabDomain = (new URL(tabs[0].url || "").host)

        let currentTabFilter = savedSiteFilters ? savedSiteFilters[tabDomain] : "achromajs-filter-none"
        currentTabFilter = currentTabFilter || "achromajs-filter-none"

        Filters.getAll().forEach((section, idx) => {
            if (this.listContainer === null) {
                console.error("List holder element is null.")
                return
            }

            if (idx > 0) {
                this.listContainer.append(document.createElement("hr"))
            }

            section.forEach((mode) => {
                const item = document.createElement("div")
                item.className = "panel-list-item"
                item.title = mode.description
                item.setAttribute("data-mode", mode.id)
                item.setAttribute("data-cssclass", mode.cssClass)
                item.onclick = clickCallback

                const icon = document.createElement("div")
                icon.className = "icon"
                const input = document.createElement("input")
                input.type = "radio"
                input.id = mode.id 
                input.name = "Action"
                input.value = mode.id
                input.checked = currentTabFilter === mode.cssClass
                icon.appendChild(input)
                item.appendChild(icon)

                const text = document.createElement("div")
                text.className = "text"
                const label = document.createElement("label")
                label.htmlFor = mode.id
                label.textContent = mode.name
                text.appendChild(label)
                item.appendChild(text)

                const shortcut = document.createElement("div")
                shortcut.className = "text-shortcut"
                item.appendChild(shortcut)

                if (this.listContainer !== null) {
                    this.listContainer.append(item)
                }
            })
        })
    }
}
