import ui from './domElements.mjs'

function resetAllModalContainers() {
        ui.aboutContainer.style.display = "none";
        ui.advancedSettingsContainer.style.display = "none";
        ui.modalBackground.style.display = "none";
        document.removeEventListener('keydown', handleEscapeKeyPress);
}
function handleEscapeKeyPress(event) {
    if (event.key === "Escape" && (ui.aboutContainer.style.display !== "none" || ui.advancedSettingsContainer.style.display !== "none")) {
        resetAllModalContainers();
    }
}
// Called by the buttons that open modals
function toggleModal(event) {
    document.addEventListener('keydown', handleEscapeKeyPress);
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