"use strict"
import ui from './modules/domElements.mjs'
import logic from './modules/logic.mjs'
import { resetAllModalContainers, toggleModal } from './modules/uiInteractions.mjs'
import { handleNewRegex, resetRegex } from './modules/regexHandler.mjs'

const inputChangeEvent = new CustomEvent('inputChange')

// helper function for updating the word length span on input's that change programmatically
function updateWordLengthSpan() {
    ui.wordLengthSpan.innerHTML = ui.wordLengthInput.value;
    logic();
}

ui.wordLengthInput.addEventListener('input', updateWordLengthSpan);
ui.wordLengthInput.addEventListener('inputChange', updateWordLengthSpan);

ui.occurrenceInput.addEventListener('input', () => {
    ui.occurrenceSpan.innerHTML = ui.occurrenceInput.value;
    logic();
});

ui.textareaInput.addEventListener('input', logic);

function handleAbbreviationLengthInput() {
    ui.abbreviationLengthSpan.innerHTML = ui.abbreviationLengthInput.value;
    try {
        ui.wordLengthInput.min = parseInt(ui.abbreviationLengthInput.value) + 1;
        ui.wordLengthInput.dispatchEvent(inputChangeEvent);
        if (ui.wordLengthInput.value < ui.wordLengthInput.min) {
            ui.wordLengthInput.value = ui.wordLengthInput.min;
            ui.wordLengthSpan.innerHTML = ui.wordLengthInput.value;
        };
        logic();
    } catch (e) {
        console.log(e);
    }
}

ui.abbreviationLengthInput.addEventListener('input', handleAbbreviationLengthInput);

ui.submitNewRegexButton.addEventListener('click', handleNewRegex);
ui.resetRegexButton.addEventListener('click', resetRegex);
ui.closeAndRunButton.addEventListener('click', () => {
    resetAllModalContainers();
    logic();
});
ui.aboutContainerCloseButton.addEventListener('click', resetAllModalContainers);
ui.modalBackground.addEventListener('click', resetAllModalContainers);
ui.aboutButton.addEventListener('click', toggleModal);
ui.advancedSettingsButton.addEventListener('click', toggleModal);
