"use strict";

const textareaInput = document.getElementById('textarea-input');
const occurrenceInput = document.getElementById('occurrence');
const occurrenceSpan = document.getElementById('occurrence-value');
const wordLengthInput = document.getElementById('length');
const wordLengthSpan = document.getElementById('length-value');
const abbreviationLengthInput = document.getElementById('abbreviation-length');
const abbreviationLengthSpan = document.getElementById('abbreviation-length-value');
const outputCont = document.getElementById('text-output-container');
const wordCountOutput = document.getElementById('word-count');
const charCountOutput = document.getElementById('char-count');
const relativeChangeOutput = document.getElementById('relative-change');
const regexInput = document.getElementById('regex-input');
const advancedSettingsError = document.getElementById('advanced-settings-error');

const inputChangeEvent = new CustomEvent('inputChange');
const originalRegex = /[^-a-z0-9. \n,?";():]/g;
var userRegex = originalRegex;

occurrenceInput.addEventListener('input', () => {
    occurrenceSpan.innerHTML = occurrenceInput.value;
    runLogic();
});

function updateWordLengthSpan() {
    wordLengthSpan.innerHTML = wordLengthInput.value;
    runLogic();
}

wordLengthInput.addEventListener('input', updateWordLengthSpan);
wordLengthInput.addEventListener('inputChange', updateWordLengthSpan);
textareaInput.addEventListener('input', runLogic);

abbreviationLengthInput.addEventListener('input', () => {
    abbreviationLengthSpan.innerHTML = abbreviationLengthInput.value;
    wordLengthInput.min = parseInt(abbreviationLengthInput.value) + 1;
    wordLengthInput.dispatchEvent(inputChangeEvent);
    if (wordLengthInput.value < wordLengthInput.min) {
        wordLengthInput.value = wordLengthInput.min;
        wordLengthSpan.innerHTML = wordLengthInput.value;
    }
    runLogic();
});

function handleNewRegex() {
    try {
        userRegex = new RegExp(regexInput.value, 'g');
        console.log(userRegex);
        if (userRegex.test('')) {
            advancedSettingsError.innerHTML = 'WARNING: Regex matches empty string';
        } else {
            advancedSettingsError.innerHTML = 'Regex is valid, ready to run';
        }
    } catch (e){
        console.log(e);
        advancedSettingsError.innerHTML = e.cause ? e.cause.message : e.message;
    }
}

function resetRegex() {
    userRegex = originalRegex;
    regexInput.value = '';
    advancedSettingsError.innerHTML = 'Regex is reset, ready to run';
}

function runLogic() {
    var input = textareaInput.value.toLowerCase();
    var initialLength = input.length;
    var occurrence = occurrenceInput.value;
    var length = wordLengthInput.value;
    var words = new Set(input.split(' '));
    let wordsToEdit = new Set();
    let abrWords = new Set();

    input = input.replace(/[“”"„“”«»「」『』]/g, '"');
    input = input.replace(userRegex, '');

    function createWordCounts(text) {
        const wordCounts = {};
        const words = text.split(/\W+/);
        for (const word of words) {
            if (word) { wordCounts[word] = (wordCounts[word] || 0) + 1; }
        }
        return wordCounts;
    }
    const wordCounts = createWordCounts(input);

    for (let [word, count] of Object.entries(wordCounts)) {
        if (count >= occurrence && word.length >= length && !words.has(word.slice(0, 3)) && !abrWords.has(word.slice(0, 3))) {
            wordsToEdit.add(word);
            abrWords.add(word.slice(0, 3));
        }
    }

    for (let word of wordsToEdit) {
        input = input.replace(new RegExp(word, 'g'), word.slice(0, 3));
    }

    outputCont.innerHTML = input;
    wordCountOutput.innerHTML = (input.split(' ').length - 1).toString().padStart(3, '0')
    charCountOutput.innerHTML = (input.length).toString().padStart(3, '0');
    relativeChangeOutput.innerHTML = (initialLength - input.length).toString().padStart(3, '0');
};
