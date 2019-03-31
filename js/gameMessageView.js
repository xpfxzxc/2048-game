let gameMessageView;

addLoadEvent(function() {
    let gameMessage = document.getElementById('game-message');
    let message = document.getElementById('message');
    let keepPlayingBtn = document.getElementById('keep-playing-btn');
    let retryBtn = document.getElementById('retry-btn');

    gameMessageView = {
        showVictory(keepPlayingable = true) {
            gameMessage.classList.add('show');
            message.textContent = 'You win!';
            if (keepPlayingable) {
                keepPlayingBtn.classList.add('show');
            }
            retryBtn.classList.add('show');
        },

        showGameOver() {
            gameMessage.classList.add('show');
            message.textContent = 'Game over!';
            retryBtn.classList.add('show');
        },

        reset() {
            gameMessage.classList.remove('show');
            message.textContent = '';
            keepPlayingBtn.classList.remove('show');
            retryBtn.classList.remove('show');
        },
    };
});