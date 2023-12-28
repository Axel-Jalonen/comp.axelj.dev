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
    output_cont = document.getElementById('text-output-container');
    output_cont.innerHTML = '';

    var input = document.getElementById('input').value.toLowerCase();
    initial_length = input.length;

    var occurrence = document.getElementById('occurrence').value;
    var length = document.getElementById('length').value;

    var word_count_output = document.getElementById('word-count');
    var char_count_output = document.getElementById('char-count');
    var relative_change_output = document.getElementById('relative-change');

    input = input.replace(/[^a-zA-Z0-9.\n ]/g, '');
    input = input.replace(/[^\w. ]+/g, '').replace(/_/g, '');

    var words = new Set(input.split(' '));

    words_to_edit = new Set();
    abr_words = new Set();

    function createWordCounts(text) {
        const word_counts = {};
        const words = text.split(/\W+/);
        for (const word of words) {
            if (word) { word_counts[word] = (word_counts[word] || 0) + 1; }
        }
        return word_counts;
    }
    word_counts = createWordCounts(input);

    for (let [word, count] of Object.entries(word_counts)) {
        if (count >= occurrence && word.length >= length && !words.has(word.slice(0, 3)) && !abr_words.has(word.slice(0, 3))) {
            words_to_edit.add(word);
            abr_words.add(word.slice(0, 3));
        }
    }

    for (let word of words_to_edit) {
        input = input.replace(new RegExp(word, 'g'), word.slice(0, 3));
    }

    output_cont.innerHTML = input;
    word_count_output.innerHTML = (input.split(' ').length - 1).toString().padStart(3, '0')
    char_count_output.innerHTML = (input.length).toString().padStart(3, '0');
    relative_change_output.innerHTML = (initial_length - input.length).toString().padStart(3, '0');
};
