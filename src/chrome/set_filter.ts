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
 * Set the filter as stored in the browsers storage by domain.
 */

declare var tabId: string
declare var tabDomain: number

if (chrome && chrome.storage && typeof tabId !== "undefined" && typeof tabDomain !== "undefined") {
    chrome.storage.local.get("achromajsSelectedFilter", function(items) {
        if (items.achromajsSelectedFilter) {
            document.documentElement.classList.forEach((c) => { if (c.startsWith("achromajs-")) document.documentElement.classList.remove(c) })
            document.documentElement.classList.add(items.achromajsSelectedFilter[tabDomain])
        }
    })
}
