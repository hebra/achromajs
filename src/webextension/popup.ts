/**
 * Copyright 2015-2024 Hendrik Brandt
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
 */

/// <reference path="../common/list.ts" />

class AchromafoxPopup {
  static instance: AchromafoxPopup = new AchromafoxPopup();

  constructor() {
    chrome.storage.local.get("achromajsSelectedFilter").then(
      (items: { [key: string]: any }) => {
        chrome.tabs.query({ active: true, currentWindow: true }).then(
          (tabs: chrome.tabs.Tab[]) => {
            const uiList = new FiltersUIList(
              document.getElementById("GeneralFilters"),
              document.getElementById("VisualEffects"),
              document.getElementById("ColorDeficiencies"),
            );
            uiList.build(
              this.filterClicked,
              tabs,
              items.achromajsSelectedFilter,
            );
          },
        );
      },
    );
  }

  /**
   * Handler when a filter was selected from the popup.
   * First, store the selected filter CSS class for the current tab"s domain, then apply it via the set_filter.js script.
   */
  async filterClicked(ev: Event) {
    const selectedCSSClass = (<HTMLElement> ev.currentTarget).getAttribute(
      "data-cssclass",
    );

    if (
      !await chrome.permissions.request({
        permissions: ["tabs", "activeTab", "scripting"],
      })
    ) {
      return;
    }

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabId = tabs[0].id;
    const tabDomain = new URL(tabs[0].url || "").host;

    // Retrieve currently saved achroma tabs and store the new one as part of the updated map
    const savedTabs = await chrome.storage.local.get(
      "achromajsSelectedFilter",
    ) as { [key: string]: any };
    const newSavedTabs = savedTabs.achromajsSelectedFilter || {};
    newSavedTabs[tabDomain] = selectedCSSClass;
    await chrome.storage.local.set({ achromajsSelectedFilter: newSavedTabs });

    const svgFilters = `PLACEHOLDER_SVG_FILTERS`;
    await chrome.scripting.executeScript({
      args: [selectedCSSClass, svgFilters],
      target: {
        tabId: tabId || 0,
        allFrames: true,
      },
      func: (selectedCSSClass: string | null, svgFilters: string) => {
        const svgId = "achromajs-svg-filters";
        if (
          !document.getElementById(svgId) && svgFilters &&
          svgFilters.includes("<svg")
        ) {
          const container = document.body || document.documentElement;
          if (container) {
            console.log("AchromaJS: Inserting SVG filters...");
            container.insertAdjacentHTML("afterbegin", svgFilters);
            console.log("AchromaJS: SVG filters inserted.");
          }
        }

        document.body.classList.forEach((c) => {
          if (c.startsWith("achromajs-")) {
            document.body.classList.remove(c);
          }
        });
        document.body.classList.add(selectedCSSClass || "");

        // Workaround for Chrome to ensure the filter is applied correctly
        setTimeout(() => {
          document.body.classList.remove(selectedCSSClass || "");
          document.body.classList.add(selectedCSSClass || "");
        }, 100);
      },
    });
  }
}
