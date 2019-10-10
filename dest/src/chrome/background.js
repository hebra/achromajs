'use strict';

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
                file: 'set_filter.js'
            })
        });
    }
});
