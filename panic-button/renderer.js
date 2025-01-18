let btntimeout = null;

function big_red_button_unpressed() {
    clearTimeout(btntimeout);
    document.getElementById('eerie-sound').play();
    document.getElementById('actionButton').style.display = 'none';
    // window.electronAPI.setTitle('Panic Button');
    window.actions.begin_terrorizing();
}

function big_red_button_pressed() {
    clearTimeout(btntimeout);
    document.getElementById('actionButton').style.display = 'none';
    btntimeout = setTimeout(display_big_red_button, 5000);
}

function display_big_red_button() {
    clearTimeout(btntimeout);
    document.getElementById('actionButton').style.display = 'block';
    btntimeout = setTimeout(big_red_button_unpressed, 3000);
}

window.onload = () => {
    document.getElementById('actionButton').addEventListener('click', () => {
        big_red_button_pressed();
    });
    big_red_button_pressed();
}