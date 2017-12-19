var document = window.document,
    templateObject = {},
    templateJSON,
    stringTemplate,
    elementsArray = [].slice.call(document.querySelectorAll(".formElement:enabled"));

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function getTemplate() {
    for (var i = 0; i < elementsArray.length; i++) {
        var e = elementsArray[i],
            id = e.id || '',
            name = e.name || '',
            value = e.value || '',
            type = e.type || '',
            tagName = e.tagName || '',
            isChecked = e.checked || '',
            selectedIndex = e.selectedIndex || '',
            isJunk = (type == 'checkbox' && isChecked == '' || type == 'text' && value == '') ? true : false; //ищем мусор, пустые event поля и пустые чекбоксы

        if (id != '' && !isJunk) {
            templateObject[id] = {
                "id": id,
                "type": type,
                "value": b64EncodeUnicode(value),
                "tagName": tagName,
                "isChecked": isChecked,
                "selectedIndex": selectedIndex
            }
        } else if (!isJunk) {
            templateObject[name] = {
                "name": name,
                "type": type,
                "value": b64EncodeUnicode(value),
                "tagName": tagName,
                "isChecked": isChecked,
                "selectedIndex": selectedIndex
            }
        }
    }
}

function writeTemplate(tempObject) {
    for (var objKey in tempObject) {
        var
            key = tempObject[objKey],
            id = key.id,
            name = key.name,
            e = document.getElementById(id) || document.querySelector('[name="' + name + '"]');

        e.disabled = false;
        e.value = b64DecodeUnicode(key.value);
        e.type = key.type;
        e.tagname = key.tagName;
        e.checked = key.isChecked;
        e.selectedIndex = key.selectedIndex;
    }
}

function copyFox() {
    getTemplate();
    templateJSON = JSON.stringify(templateObject);
    copyTextToClipboard(templateJSON);
}

function insertFox() {
    var jsonField = document.getElementById('templateinput');
    if (jsonField.value) {
        stringTemplate = jsonField.value;
        templateObject = JSON.parse(stringTemplate);
        writeTemplate(templateObject);
        jsonField.value = '';
    } else alert('Вставьте JSON шаблона в поле!');
}

function insertSubmitFox() {
    var jsonField = document.getElementById('templateinput');
    if (jsonField.value) {
        stringTemplate = jsonField.value;
        templateObject = JSON.parse(stringTemplate);
        writeTemplate(templateObject);
        jsonField.value = '';
        document.forms['addTemplateForm'].submit();
    } else alert('Вставьте JSON шаблона в поле!');
}

function insertDefaultTemplate(defaultTemplate) {
    templateObject = JSON.parse(defaultTemplate);
    writeTemplate(templateObject);
    document.forms['addTemplateForm'].submit();
}

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying template ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);

    var copiedText = document.getElementById('copied');
    copiedText.style.display = 'block';
    copiedText.style.opacity = '1.0';
    setTimeout(function () {
        copiedText.style.opacity = '0';
    }, 100);
    setTimeout(function () {
        copiedText.style.display = 'none';
    }, 1000);
};

var defaultTemplates = {
    adx: '{"name":{"id":"name","type":"text","value":"0KjQsNCx0LvQvtC9INC00LvRjyDQv9GA0L7QsdGA0L7RgdCwIEFEWCAyLjA=","tagName":"INPUT","isChecked":"","selectedIndex":""},"description":{"name":"description","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"predefinedParameters[trackingURL]":{"id":"predefinedParameters[trackingURL]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[0][enabled]":{"id":"userParameters[0][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-0[name]":{"id":"userParameters-0[name]","type":"text","value":"0KjQuNGA0LjQvdCwINCx0LDQvdC90LXRgNCwICjQsiBweCk=","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[0][required]":{"id":"userParameters[0][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[0][type]":{"id":"userParameters[0][type]","type":"select-one","value":"c3RyaW5n","tagName":"SELECT","isChecked":"","selectedIndex":""},"userParameters[0][default]":{"name":"userParameters[0][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"userParameters[1][enabled]":{"id":"userParameters[1][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-1[name]":{"id":"userParameters-1[name]","type":"text","value":"0JLRi9GB0L7RgtCwINCx0LDQvdC90LXRgNCwICjQsiBweCk=","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[1][required]":{"id":"userParameters[1][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[1][type]":{"id":"userParameters[1][type]","type":"select-one","value":"c3RyaW5n","tagName":"SELECT","isChecked":"","selectedIndex":""},"userParameters[1][default]":{"name":"userParameters[1][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"userParameters[2][enabled]":{"id":"userParameters[2][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-2[name]":{"id":"userParameters-2[name]","type":"text","value":"YWQtY2xpZW50","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[2][required]":{"id":"userParameters[2][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[2][type]":{"id":"userParameters[2][type]","type":"select-one","value":"c3RyaW5n","tagName":"SELECT","isChecked":"","selectedIndex":""},"userParameters[2][default]":{"name":"userParameters[2][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"userParameters[3][enabled]":{"id":"userParameters[3][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-3[name]":{"id":"userParameters-3[name]","type":"text","value":"YWQtc2xvdA==","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[3][required]":{"id":"userParameters[3][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[3][type]":{"id":"userParameters[3][type]","type":"select-one","value":"c3RyaW5n","tagName":"SELECT","isChecked":"","selectedIndex":""},"userParameters[3][default]":{"name":"userParameters[3][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"codeType":{"id":"codeType","type":"select-one","value":"MQ==","tagName":"SELECT","isChecked":"","selectedIndex":1},"impressionCode":{"name":"impressionCode","type":"textarea","value":"JWdsb2JhbC5iYW5uZXJfYWR4MiU=","tagName":"TEXTAREA","isChecked":"","selectedIndex":""}}',
    dfp: '{"name":{"id":"name","type":"text","value":"REZQIEJhbm5lcg==","tagName":"INPUT","isChecked":"","selectedIndex":""},"description":{"name":"description","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"predefinedParameters[trackingURL]":{"id":"predefinedParameters[trackingURL]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[0][enabled]":{"id":"userParameters[0][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-0[name]":{"id":"userParameters-0[name]","type":"text","value":"0KjQuNGA0LjQvdCwINCx0LDQvdC90LXRgNCwICjQsiBweCk=","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[0][required]":{"id":"userParameters[0][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[0][type]":{"id":"userParameters[0][type]","type":"select-one","value":"c3RyaW5n","tagName":"SELECT","isChecked":"","selectedIndex":""},"userParameters[0][default]":{"name":"userParameters[0][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"userParameters[1][enabled]":{"id":"userParameters[1][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-1[name]":{"id":"userParameters-1[name]","type":"text","value":"0JLRi9GB0L7RgtCwINCx0LDQvdC90LXRgNCwICjQsiBweCk=","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[1][required]":{"id":"userParameters[1][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[1][type]":{"id":"userParameters[1][type]","type":"select-one","value":"c3RyaW5n","tagName":"SELECT","isChecked":"","selectedIndex":""},"userParameters[1][default]":{"name":"userParameters[1][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"userParameters[2][enabled]":{"id":"userParameters[2][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-2[name]":{"id":"userParameters-2[name]","type":"text","value":"0JrQvtC0INCy0YHRgtCw0LLQutC4","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[2][required]":{"id":"userParameters[2][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[2][type]":{"id":"userParameters[2][type]","type":"select-one","value":"dGV4dA==","tagName":"SELECT","isChecked":"","selectedIndex":1},"userParameters[2][default]":{"name":"userParameters[2][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"userParameters[3][enabled]":{"id":"userParameters[3][enabled]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters-3[name]":{"id":"userParameters-3[name]","type":"text","value":"0JjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMIFNhZmVGcmFtZSAoeWVzfG5vKQ==","tagName":"INPUT","isChecked":"","selectedIndex":""},"userParameters[3][required]":{"id":"userParameters[3][required]","type":"checkbox","value":"b24=","tagName":"INPUT","isChecked":true,"selectedIndex":""},"userParameters[3][type]":{"id":"userParameters[3][type]","type":"select-one","value":"c3RyaW5n","tagName":"SELECT","isChecked":"","selectedIndex":""},"userParameters[3][default]":{"name":"userParameters[3][default]","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"codeType":{"id":"codeType","type":"select-one","value":"MQ==","tagName":"SELECT","isChecked":"","selectedIndex":1},"impressionCode":{"name":"impressionCode","type":"textarea","value":"JWdsb2JhbC5iYW5uZXJfZGZwJQ==","tagName":"TEXTAREA","isChecked":"","selectedIndex":""}}',
    soloway: '{"name":{"id":"name","type":"text","value":"U29sb3dheQ==","tagName":"INPUT","isChecked":"","selectedIndex":""},"description":{"name":"description","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"codeType":{"id":"codeType","type":"select-one","value":"MQ==","tagName":"SELECT","isChecked":"","selectedIndex":1},"impressionCode":{"name":"impressionCode","type":"textarea","value":"JWdsb2JhbC5iYW5uZXJfYWRyaXZlciU=","tagName":"TEXTAREA","isChecked":"","selectedIndex":""}}',
    criteo: '{"name":{"id":"name","type":"text","value":"Q3JpdGVv","tagName":"INPUT","isChecked":"","selectedIndex":""},"description":{"name":"description","type":"textarea","value":"","tagName":"TEXTAREA","isChecked":"","selectedIndex":""},"codeType":{"id":"codeType","type":"select-one","value":"MQ==","tagName":"SELECT","isChecked":"","selectedIndex":1},"impressionCode":{"name":"impressionCode","type":"textarea","value":"JWdsb2JhbC5iYW5uZXJfY3JpdGVvJQ==","tagName":"TEXTAREA","isChecked":"","selectedIndex":""}}'
};

var copyDiv,
    pasteDiv,
    pasteSubmitDiv,
    adxDiv,
    dfpDiv,
    solowayDiv,
    criteoDiv;

copyDiv = document.getElementById('copyDiv');
copyDiv.addEventListener('click', function () {
    copyFox();
});

pasteDiv = document.getElementById('pasteDiv');
pasteDiv.addEventListener('click', function () {
    insertFox();
});

pasteSubmitDiv = document.getElementById('pasteSubmitDiv');
pasteSubmitDiv.addEventListener('click', function () {
    insertSubmitFox();
})

adxDiv = document.getElementById('adxDiv');
adxDiv.addEventListener('click', function () {
    insertDefaultTemplate(defaultTemplates.adx)
});

dfpDiv = document.getElementById('dfpDiv');
dfpDiv.addEventListener('click', function () {
    insertDefaultTemplate(defaultTemplates.dfp)
});

solowayDiv = document.getElementById('solowayDiv');
solowayDiv.addEventListener('click', function () {
    insertDefaultTemplate(defaultTemplates.soloway)
});

criteoDiv = document.getElementById('criteoDiv');
criteoDiv.addEventListener('click', function () {
    insertDefaultTemplate(defaultTemplates.criteo)
});