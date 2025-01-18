const button = document.getElementById('actionButton');

button.addEventListener('click', () => {
    // Add your event handling logic here
    console.log('Button clicked!');
    // Example of how to trigger different events:
    triggerEvent();
});

function triggerEvent() {
    document.getElementById('eerie-sound').play();
    window.electronAPI.setTitle('Panic Button');
    window.actions.begin_terrorizing();
    // This function can contain different events that you want to trigger
    // For example:
    // - Animate the button
    // - Show notifications
    // - Change window properties
    // - Make API calls
    // - etc.
}