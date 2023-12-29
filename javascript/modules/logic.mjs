import ui from './domElements.mjs'
import { userRegex } from './regexHandler.mjs'
export default function logic() {
    var input = ui.textareaInput.value.toLowerCase()
    const occurrence = ui.occurrenceInput.value
    const wordLength = ui.wordLengthInput.value
    const abbrevLength = ui.abbreviationLengthInput.value

    const initialLength = input.length
    const words = new Set(input.split(' '))
    const wordsToEdit = new Set()
    const abrWords = new Set()

    input = input.replace(/[“”"„“”«»「」『』]/g, '"')
    input = input.replace(userRegex, '')

    for (let [word, count] of Object.entries(createWordCounts(input))) {
        if (count >= occurrence && word.length >= wordLength && !words.has(word.slice(0, abbrevLength)) && !abrWords.has(word.slice(0, abbrevLength))) {
            wordsToEdit.add(word)
            abrWords.add(word.slice(0, abbrevLength))
        }
    }

    for (let word of wordsToEdit) {
        input = input.replace(new RegExp(word, 'g'), word.slice(0, abbrevLength))
    }

    ui.outputCont.innerHTML = input
    ui.wordCountOutput.innerHTML = (input.split(' ').length - 1).toString().padStart(3, '0')
    ui.charCountOutput.innerHTML = (input.length).toString().padStart(3, '0')
    ui.relativeChangeOutput.innerHTML = (initialLength - input.length).toString().padStart(3, '0')
};
function createWordCounts(text) {
    const wordCounts = {}
    const words = text.split(/\W+/)
    for (const word of words) {
        if (word) { wordCounts[word] = (wordCounts[word] || 0) + 1 }
    }
    return wordCounts
}