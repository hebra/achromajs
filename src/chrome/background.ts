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

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({})
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

/**
 * Apply selected filter (if any) on page load or change
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!tab || !tab.url || !tab.url.split(":")[0].startsWith('http')) {
        return;
    }
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.executeScript(
            tabId, {
            code: `
                var tabId=` + tabId + `;
                var tabDomain='` + (new URL(tab.url).host) + `';
            `
        }, function () {
            chrome.tabs.executeScript(
                tabId, {
                file: 'chrome/set_filter.js'
            })
        });
    }
});
