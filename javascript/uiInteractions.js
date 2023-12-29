let aboutContainer = document.getElementById('about-container');
let advancedSettingsContainer = document.getElementById('advanced-settings-container');
let modalBackground = document.getElementById('modal-background');

document.addEventListener('keydown', handleEscapeKeyPress);
modalBackground.addEventListener('click', resetAllModalContainers);

function resetAllModalContainers() {
        aboutContainer.style.display = "none";
        advancedSettingsContainer.style.display = "none";
        modalBackground.style.display = "none";
}
function handleEscapeKeyPress(event) {
    if (event.key === "Escape" && (aboutContainer.style.display !== "none" || advancedSettingsContainer.style.display !== "none")) {
        resetAllModalContainers();
    }
}

function toggleModal(event) {
    // setup case
    switch (event?.target?.name) {
        case "about-button":
            aboutContainer.style.display = "block";
            modalBackground.style.display = modalBackground.style.display === "none" ? "block" : "none";
            break;
        case "advanced-settings-button":
            advancedSettingsContainer.style.display = "block";
            modalBackground.style.display = modalBackground.style.display === "none" ? "block" : "none";
            break;
        default:
            break;
    }
};