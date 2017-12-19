var document = window.document;
var s = document.createElement('script');
s.src = chrome.extension.getURL('injected.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

var w = document.createElement('link');
w.href = chrome.extension.getURL('copier.css');
w.type = 'text/css';
w.rel = 'stylesheet';
(document.head || document.documentElement).appendChild(w);

function createButtonElement(id, text) {
    var q = document.createElement('div');
    q.id = id + 'Div';
    q.className = 'buttonDiv';
    document.body.appendChild(q);
    var w = document.createElement('p');
    w.id = id + 'Text';
    w.textContent = text;
    q.appendChild(w);
}

createButtonElement('copy', 'Copy');
createButtonElement('paste', 'Paste');
createButtonElement('pasteSubmit', 'Paste & Submit');
createButtonElement('adx', 'ADX');
createButtonElement('dfp', 'DFP');
createButtonElement('criteo', 'Criteo');
createButtonElement('soloway', 'Soloway');

var q = document.createElement('textarea');
q.id = 'templateinput';
q.setAttribute('placeholder', 'Вставьте JSON шаблона');
document.body.appendChild(q);

var copied = document.createElement('p');
copied.id = 'copied';
copied.textContent = 'Шаблон скопирован';
document.body.appendChild(copied);
