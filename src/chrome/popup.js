// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function (data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// });

//};

/**
 * Create the popup menu list of possible actions (in addition to No Filter).
 */
const actionList = document.getElementById('ActionList');

Object.keys(modes).forEach(function (section) {

    actionList.append(document.createElement('hr'));

    Object.keys(modes[section]).forEach(function (modeName) {

        const input = document.createElement('input');

        input.value = modeName;
        input.id = modeName;
        input.name = 'Action';
        input.type = 'radio';

        const label = document.createElement('label');
        label.innerHTML = modeName;
        label.htmlFor = modeName;

        const li = document.createElement('li');
        li.append(input);
        li.append(label);
        li.title = modes[section][modeName];

        li.setAttribute('data-section', section);
        li.setAttribute('data-mode', modeName);
        li.onclick = actions_onclick;

        actionList.append(li);

    });
});

