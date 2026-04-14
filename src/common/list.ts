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
    constructor(
        private generalContainer: HTMLElement | null,
        private effectsContainer: HTMLElement | null = null,
        private cvdContainer: HTMLElement | null = null
    ) { }

    build(clickCallback: any, tabs: any, savedSiteFilters?: any) {
        const tabDomain = (new URL(tabs[0].url || "").host)

        let currentTabFilter = savedSiteFilters ? savedSiteFilters[tabDomain] : "achromajs-filter-none"
        currentTabFilter = currentTabFilter || "achromajs-filter-none"

        const filters = new Filters()
        let categories: { container: HTMLElement | null, modes: FilterMode[], type: 'segmented' | 'list' }[] = []

        if (this.effectsContainer && this.cvdContainer) {
            // Multi-container mode (new WebExtension UI)
            categories = [
                { container: this.generalContainer, modes: [...filters.reset, ...filters.blur], type: 'segmented' },
                { container: this.effectsContainer, modes: filters.contrast, type: 'segmented' },
                { container: this.cvdContainer, modes: [...filters.achromato, ...filters.prot, ...filters.deuter, ...filters.tritan], type: 'list' }
            ]
        } else {
            // Single container mode (Library / Legacy)
            categories = [
                { container: this.generalContainer, modes: [...filters.reset, ...filters.blur, ...filters.contrast, ...filters.achromato, ...filters.prot, ...filters.deuter, ...filters.tritan], type: 'list' }
            ]
        }

        categories.forEach(category => {
            if (!category.container) return

            category.modes.forEach(mode => {
                const isActive = currentTabFilter === mode.cssClass
                if (category.type === 'segmented') {
                    const btn = document.createElement("button")
                    btn.textContent = mode.name.replace(" Filter", "").replace(" Colours", "")
                    btn.className = isActive ? "active" : ""
                    btn.title = mode.description
                    btn.setAttribute("data-cssclass", mode.cssClass)
                    btn.onclick = (ev) => {
                        category.container?.querySelectorAll("button").forEach(b => b.classList.remove("active"))
                        btn.classList.add("active")
                        clickCallback(ev)
                    }
                    category.container?.appendChild(btn)
                } else {
                    const item = document.createElement("div")
                    item.className = `list-item ${isActive ? "active" : ""}`
                    item.setAttribute("data-cssclass", mode.cssClass)
                    item.onclick = (ev) => {
                        const isAlreadyActive = item.classList.contains("active")
                        category.container?.querySelectorAll(".list-item").forEach(i => i.classList.remove("active"))
                        
                        if (isAlreadyActive) {
                            item.setAttribute("data-cssclass", "achromajs-filter-none")
                        } else {
                            item.classList.add("active")
                            item.setAttribute("data-cssclass", mode.cssClass)
                        }
                        clickCallback(ev)
                        // Restore original class for future clicks if it was changed
                        item.setAttribute("data-cssclass", mode.cssClass)
                    }

                    const content = document.createElement("div")
                    content.className = "list-item-content"

                    const name = document.createElement("span")
                    name.className = "list-item-name"
                    name.textContent = mode.name
                    content.appendChild(name)

                    const desc = document.createElement("span")
                    desc.className = "list-item-description"
                    desc.textContent = mode.description
                    content.appendChild(desc)

                    item.appendChild(content)

                    const toggle = document.createElement("div")
                    toggle.className = "toggle-switch"
                    const knob = document.createElement("div")
                    knob.className = "toggle-knob"
                    toggle.appendChild(knob)
                    item.appendChild(toggle)

                    category.container?.appendChild(item)
                }
            })
        })
    }
}
