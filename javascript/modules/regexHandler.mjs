'use strict'

import ui from './domElements.mjs'
const ase = ui.advancedSettingsError

const originalRegex = /[^-a-z0-9. \n,?";():]/g
const originalRegexHtml = "/[^-a-z0-9. \n,?\";():]/"
var userRegex = originalRegex

function handleNewRegex() {
    try {
        userRegex = new RegExp(ui.regexInput.value, 'g')
        console.log(userRegex)
        if (userRegex.test('')) {
            ase.innerHTML = 'WARNING: Regex matches empty string'
        } else {
            ase.innerHTML = 'Regex is valid, ready to run'
        }
    } catch (e){
        console.log(e)
        ase.innerHTML = e.cause ? e.cause.message : e.message
    }
}

function resetRegex() {
    userRegex = originalRegex
    ui.regexInput.value = originalRegexHtml
    ase.innerHTML = 'Regex is reset, ready to run'
}

export { handleNewRegex, resetRegex, userRegex}