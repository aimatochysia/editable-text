document.getElementById('expand').addEventListener('click', () => {
    sendCommand('expandSelection');
});

document.getElementById('shrink').addEventListener('click', () => {
    sendCommand('shrinkSelection');
});

document.getElementById('replace').addEventListener('click', () => {
    const text = document.getElementById('replaceText').value;
    const matchCase = document.getElementById('matchCase').checked;
    const matchWholeWord = document.getElementById('matchWholeWord').checked;
    sendCommand('replaceText', { text, matchCase, matchWholeWord });
});

document.getElementById('undo').addEventListener('click', () => {
    sendCommand('undo');
});

document.getElementById('redo').addEventListener('click', () => {
    sendCommand('redo');
});

function sendCommand(command, data = {}) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: commandHandler,
            args: [command, data]
        });
    });
}

function commandHandler(command, data) {
    switch (command) {
        case 'expandSelection':
            expandSelection();
            break;
        case 'shrinkSelection':
            shrinkSelection();
            break;
        case 'replaceText':
            replaceSelectedText(data);
            break;
        case 'undo':
            document.execCommand('undo');
            break;
        case 'redo':
            document.execCommand('redo');
            break;
    }
}
