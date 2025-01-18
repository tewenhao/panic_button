let flipCount = 0;

function flipCoin(userChoice) {
    flipCount++;
    let outcome;

    if (flipCount <= 3) {
        outcome = userChoice === 'heads' ? 'tails' : 'heads';
    } else {
        outcome = Math.random() < 0.5 ? 'heads' : 'tails';
    }

    document.getElementById('result').innerText = `You chose ${userChoice}. The coin landed on ${outcome}.`;
    window.coinflip.submit_user_choice(userChoice);
    window.coinflip.close_window();
}