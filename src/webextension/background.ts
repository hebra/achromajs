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

/**
 * Apply selected filter (if any) on page load or change
 */

console.log("AchromaJS: Background script loaded.");

chrome.tabs.onActivated.addListener(
  function (activeInfo: chrome.tabs.ActiveInfo) {
    console.log("AchromaJS: Tab activated", activeInfo);
    chrome.tabs.get(activeInfo.tabId).then((tab) => {
      if (!tab || !tab.url || !tab.url.startsWith("http") || !tab.active) {
        return;
      }
      setBackgroundFilter(tab);
    });
  },
);

chrome.tabs.onUpdated.addListener(
  (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab,
  ) => {
    if (
      !tab || !tab.url || !tab.url.startsWith("http") ||
      changeInfo.status !== "complete" || !tab.active
    ) {
      return;
    }
    console.log("AchromaJS: Tab updated", tabId, changeInfo.status);
    setBackgroundFilter(tab);
  },
);

function setBackgroundFilter(tab: chrome.tabs.Tab) {
  console.log("AchromaJS: Setting background filter for", tab.url);
  const svgFilters = `PLACEHOLDER_SVG_FILTERS`;
  chrome.scripting.executeScript(
    {
      target: {
        tabId: tab.id || 0,
        allFrames: true,
      },
      args: [new URL(tab.url || "").host, svgFilters],
      func: (host: string, svgFilters: string) => {
        chrome.storage.local.get("achromajsSelectedFilter")
          .then((items) => {
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

            const selectedFilter = (items as any).achromajsSelectedFilter;
            if (selectedFilter && selectedFilter[host]) {
              console.log(
                "AchromaJS: Applying background filter",
                selectedFilter[host],
              );
              document.body.classList.forEach((c) => {
                if (c.startsWith("achromajs-")) {
                  document.body.classList.remove(c);
                }
              });
              document.body.classList.add(selectedFilter[host]);
            }
          });
      },
    },
  ).catch(console.error);
}
