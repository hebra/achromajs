/**
 * Copyright 2015-2023 Hendrik Brandt
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

class AchromafoxPopup {

    static instance: AchromafoxPopup = new AchromafoxPopup()

    constructor() {
        chrome.storage.local.get("achromajsSelectedFilter").then((items) => {
            chrome.tabs.query({active: true, currentWindow: true}).then((tabs) => {
                new FiltersUIList(document.getElementById("ActionList")).build(this.filterClicked, tabs, items.achromajsSelectedFilter)
            })
        })
    }

    /**
     * Handler when a filter was selected from the popup.
     * First, store the selected filter CSS class for the current tab"s domain, then apply it via the set_filter.js script.
     */
    async filterClicked(ev: Event) {

        const selectedCSSClass = (<HTMLElement>ev.currentTarget).getAttribute("data-cssclass")

        if (!await chrome.permissions.request({permissions: ["tabs", "activeTab", "scripting"]})) {
            return
        }

        const tabs = await chrome.tabs.query({active: true, currentWindow: true})
        const tabId = tabs[0].id
        const tabDomain = (new URL(tabs[0].url || "").host)

        // Retrieve currently saved achroma tabs and store the new one as part of the updated map
        const savedTabs = await chrome.storage.local.get("achromajsSelectedFilter")
        const newSavedTabs = savedTabs && savedTabs.achromajsSelectedFilter ? savedTabs.achromajsSelectedFilter : {}
        newSavedTabs[tabDomain] = selectedCSSClass
        await chrome.storage.local.set({achromajsSelectedFilter: newSavedTabs})

        await chrome.scripting.executeScript({
            args: [selectedCSSClass],
            target: {
                tabId: tabId || 0,
                allFrames: true
            },
            func: (selectedCSSClass) => {
                document.documentElement.classList.forEach((c) => {
                    if (c.startsWith("achromajs-")) {
                        document.documentElement.classList.remove(c)
                    }
                })
                document.documentElement.classList.add(selectedCSSClass || "")
            }
        })
    }
}

