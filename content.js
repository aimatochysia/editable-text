function expandSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.setStart(range.startContainer, 0);
        range.setEnd(range.endContainer, range.endContainer.length);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function shrinkSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const text = range.toString().trim();
        const startOffset = range.startOffset + text.indexOf(text);
        const endOffset = startOffset + text.length;
        range.setStart(range.startContainer, startOffset);
        range.setEnd(range.endContainer, endOffset);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function replaceSelectedText({ text, matchCase, matchWholeWord }) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const originalText = range.toString();

    const regexFlags = matchCase ? 'g' : 'gi';
    const wordBoundary = matchWholeWord ? '\\b' : '';
    const regex = new RegExp(wordBoundary + originalText + wordBoundary, regexFlags);

    const newText = originalText.replace(regex, text);
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
    selection.removeAllRanges();
}
