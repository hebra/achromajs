'use strict';

/**
 * Handler when a filter was selected from the popup. 
 * First, store the selected filter CSS class for the current tab's domain, then apply it via the set_filter.js script.
 */
var achromajs = window.achromajs || {}

achromajs.onSelectFilter = function (ev) {
    const selectedCSSClass = ev.currentTarget.getAttribute('data-cssclass');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabDomain = (new URL(tabs[0].url).host);

        chrome.storage.local.get('achromajsSelectedFilter', function (savedTabs) {

            const newSavedTabs = savedTabs && savedTabs.achromajsSelectedFilter ? savedTabs.achromajsSelectedFilter : {};

            newSavedTabs[tabDomain] = selectedCSSClass;

            chrome.storage.local.set({
                achromajsSelectedFilter: newSavedTabs
            }, function () {
                chrome.tabs.executeScript(
                    tabId, {
                    code: `
                    var tabId=` + tabId + `;
                    var tabDomain='` + tabDomain + `';
                `
                }, function () {
                    chrome.tabs.executeScript(
                        tabId, {
                        file: 'set_filter.js'
                    }, window.close)
                });
            });
        });
    });
}
