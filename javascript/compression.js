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

const inputChangeEvent = new CustomEvent('inputChange');

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

function runLogic() {
    outputCont.innerHTML = '';
    var input = textareaInput.value.toLowerCase();
    initialLength = input.length;
    var occurrence = occurrenceInput.value;
    var length = wordLengthInput.value;
    // normalize quotes
    input = input.replace(/[“”"„“”«»「」『』]/g, '"');
    // clean input
    input = input.replace(/[^-a-zA-Z0-9. \n,?";():]/g, '');
    var words = new Set(input.split(' '));
    wordsToEdit = new Set();
    abrWords = new Set();

    function createWordCounts(text) {
        const wordCounts = {};
        const words = text.split(/\W+/);
        for (const word of words) {
            if (word) { wordCounts[word] = (wordCounts[word] || 0) + 1; }
        }
        return wordCounts;
    }
    wordCounts = createWordCounts(input);

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
