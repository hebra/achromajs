actions_onclick = function (ev) {
    // First get the correct filter for the selected modus
    const filter = filters[ev.currentTarget.getAttribute('data-section')][ev.currentTarget.getAttribute('data-mode')];


    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            //{ code: 'document.body.style.filter = "' + filter + '";' }
            { code: 'document.body.style.filter = "' + filter + '";' }
        );
    });


    // window.close();

}