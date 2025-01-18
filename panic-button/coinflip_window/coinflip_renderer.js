let flipCount = 0;

let escapeCount = 0;

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

function randomizeButtons() {
    const headsButton = document.getElementById('heads');
    const tailsButton = document.getElementById('tails');
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;

    const randomPosition = () => ({
        left: Math.random() * (bodyWidth - 100) + 'px',
        top: Math.random() * (bodyHeight - 50) + 'px'
    });

    const headsPosition = randomPosition();
    const tailsPosition = randomPosition();

    headsButton.style.left = headsPosition.left;
    headsButton.style.top = headsPosition.top;
    headsButton.style.position = 'absolute';

    tailsButton.style.left = tailsPosition.left;
    tailsButton.style.top = tailsPosition.top;
    tailsButton.style.position = 'absolute';

}

function runaway() {
    escapeCount++;
    if (escapeCount <= 5) {
        randomizeButtons();
    }
    console.log(escapeCount)
}

window.onload = () => {
    // setInterval(randomizeButtons, 1000);

    // document.getElementById('heads').addEventListener("mouseenter",  runaway);
    // document.getElementById('tails').addEventListener("mouseenter",  runaway);
}