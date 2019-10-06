/**
 * Set the filter as stored in the browsers storage by domain.
 */
if (chrome && chrome.storage && typeof tabId !== 'undefined' && typeof tabDomain !== 'undefined') {
    chrome.storage.local.get('achromajsSelectedFilter', function (items) {
        if (items.achromajsSelectedFilter) {
            document.body.classList.forEach((c) => { if (c.startsWith('achromajs-')) document.body.classList.remove(c); });
            document.body.classList.add(items.achromajsSelectedFilter[tabDomain]);
        }
    });
}

