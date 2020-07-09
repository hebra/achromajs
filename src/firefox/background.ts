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

/**
 * Apply selected filter (if any) on page load or change
 */
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!tab || !tab.url || !tab.url.startsWith('http')) {
        return;
    }
    if (changeInfo.status == 'complete' && tab.active) {
        browser.tabs.executeScript(
            tabId, {
            code: `
                var tabId=` + tabId + `;
                var tabDomain='` + (new URL(tab.url).host) + `';
            `
        }).then(() => {
            browser.tabs.executeScript(
                tabId, {
                file: 'firefox/set_filter.js'
            }).catch(console.error);
        }).catch(console.error);
    }
});
