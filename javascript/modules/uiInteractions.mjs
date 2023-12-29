import ui from './domElements.mjs'

// document.addEventListener('keydown', handleEscapeKeyPress);

// function handleEscapeKeyPress(event) {
//     if (event.key === "Escape" && (aboutContainer.style.display !== "none" || advancedSettingsContainer.style.display !== "none")) {
//         resetAllModalContainers();
//     }
// }

function resetAllModalContainers() {
        ui.aboutContainer.style.display = "none";
        ui.advancedSettingsContainer.style.display = "none";
        ui.modalBackground.style.display = "none";
}
function toggleModal(event) {
    // setup case
    switch (event?.target?.id) {
        case "about-button":
            ui.aboutContainer.style.display = "block";
            ui.modalBackground.style.display = ui.modalBackground.style.display === "none" ? "block" : "none";
            break;
        case "advanced-settings-button":
            ui.advancedSettingsContainer.style.display = "block";
            ui.modalBackground.style.display = ui.modalBackground.style.display === "none" ? "block" : "none";
            break;
        default:
            break;
    }
};
export { resetAllModalContainers, toggleModal } 