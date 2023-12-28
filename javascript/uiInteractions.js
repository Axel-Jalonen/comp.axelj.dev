let aboutContainer = document.getElementById('about-container');
let aboutContainerBackground = document.getElementById('about-container-background');

document.addEventListener('keydown', handleEscapeKeyPress);
aboutContainerBackground.addEventListener('click', toggleAbout);

function handleEscapeKeyPress(event) {
    if (event.key === "Escape" && aboutContainer.style.display !== "none") {
        toggleAbout();
    }
}

function toggleAbout() {
    aboutContainer.style.display = aboutContainer.style.display === "none" ? "block" : "none";
    aboutContainerBackground.style.display = aboutContainerBackground.style.display === "none" ? "block" : "none";
};