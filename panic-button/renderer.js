let btntimeout = null;

function big_red_button_unpressed() {
    clearTimeout(btntimeout);
    document.getElementById('eerie-sound').play();
    document.getElementById('actionButton').style.display = 'none';
    window.actions.set_on_top('set-always-on-top', true);
    // window.electronAPI.setTitle('Panic Button');
    window.actions.begin_terrorizing();
}

function big_red_button_pressed() {
    clearTimeout(btntimeout);
    document.getElementById('actionButton').style.display = 'none';
    window.actions.set_on_top('set-always-on-top', false);
    btntimeout = setTimeout(display_big_red_button, 5000);
}

function display_big_red_button() {
    clearTimeout(btntimeout);
    window.actions.set_on_top('set-always-on-top', true);
    document.getElementById('actionButton').style.display = 'block';
    btntimeout = setTimeout(big_red_button_unpressed, 3000);
}

window.onload = () => {
    document.getElementById('actionButton').addEventListener('click', () => {
        big_red_button_pressed();
    });
    big_red_button_pressed();
}