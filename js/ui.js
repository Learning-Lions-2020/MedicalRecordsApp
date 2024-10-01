// Show or hide an element based on its ID
function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? "block" : "none";
}

// Show loading indicator
function showLoadingIndicator() {
    toggleVisibility("loading-indicator", true);
}

// Hide loading indicator
function hideLoadingIndicator() {
    toggleVisibility("loading-indicator", false);
}

// Show error message
function showErrorMessage(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    toggleVisibility("error-message", true);

    // Optional: Hide error message after 5 seconds
    setTimeout(() => {
        hideErrorMessage();
    }, 5000);
}

// Hide error message
function hideErrorMessage() {
    toggleVisibility("error-message", false);
}
