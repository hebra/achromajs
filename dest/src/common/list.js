
'use strict';

/**
 * Create the popup menu list of possible actions (in addition to No Filter).
 */

var achromajs = window.achromajs || {}

achromajs.createFilterList = function (holderId) {
    const actionList = document.getElementById(holderId);

    Object.keys(modes).forEach(function (section) {

        actionList.append(document.createElement('hr'));

        modes[section].forEach(function (mode) {
            const input = document.createElement('input');

            input.value = mode.id;
            input.id = mode.id;
            input.name = 'Action';
            input.type = 'radio';

            const label = document.createElement('label');
            label.innerHTML = mode.name;
            label.htmlFor = mode.id;

            const li = document.createElement('li');
            li.append(input);
            li.append(label);
            li.title = mode.description;

            li.setAttribute('data-section', section);
            li.setAttribute('data-mode', mode.id);
            li.setAttribute('data-cssclass', mode.cssClass);
            li.onclick = achromajs.onSelectFilter;

            actionList.append(li);

        });
    });
}

