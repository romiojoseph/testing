function copyLinkToClipboard() {
    const currentLink = window.location.href;
    navigator.clipboard.writeText(currentLink)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

const copyButton = document.getElementById('copy-link');
if (copyButton) {
    copyButton.addEventListener('click', copyLinkToClipboard);
}