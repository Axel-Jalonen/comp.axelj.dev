document.getElementById('occurrence').addEventListener('input', function () {
    document.getElementById('occurrence-value').innerHTML = document.getElementById('occurrence').value;
    runLogic();
})
document.getElementById('length').addEventListener('input', function () {
    document.getElementById('length-value').innerHTML = document.getElementById('length').value;
    runLogic();
})
document.getElementById('textarea-input').addEventListener('input', runLogic);

function runLogic() {
    outputCont = document.getElementById('text-output-container');
    outputCont.innerHTML = '';

    var input = document.getElementById('textarea-input').value.toLowerCase();
    initialLength = input.length;

    var occurrence = document.getElementById('occurrence').value;
    var length = document.getElementById('length').value;

    var wordCountOutput = document.getElementById('word-count');
    var charCountOutput = document.getElementById('char-count');
    var relativeChangeOutput = document.getElementById('relative-change');

    input = input.replace(/[^-a-zA-Z0-9. ,?]/g, '');

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
