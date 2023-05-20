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

/**
 * Apply selected filter (if any) on page load or change
 */

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId).then(tab => {
        if (!tab || !tab.url || !tab.url.startsWith("http") || !tab.active) {
            return
        }
        setBackgroundFilter(tab)
    })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab || !tab.url || !tab.url.startsWith("http") || changeInfo.status !== "complete" || !tab.active) {
        return
    }
    setBackgroundFilter(tab)
})

function setBackgroundFilter(tab: chrome.tabs.Tab) {
    chrome.scripting.executeScript(
        {
            target: {
                tabId: tab.id || 0,
                allFrames: true
            },
            args: [new URL(tab.url || "").host],
            func: (host) => {
                chrome.storage.local.get("achromajsSelectedFilter")
                    .then((items) => {
                        if (items.achromajsSelectedFilter) {
                            document.documentElement.classList.forEach((c) => {
                                if (c.startsWith("achromajs-")) document.documentElement.classList.remove(c)
                            })
                            document.documentElement.classList.add(items.achromajsSelectedFilter[host])
                        }
                    })
            }
        }).catch(console.error)
}
