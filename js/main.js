function visualize() {
    boardView.clear();
    boardView.showNewTiles(board.getNewTiles(), board.getTileNum());

    scoreView.updateScore(board.getScore(), board.getAddedScore());
    scoreView.updateBestScore(board.getBestScore());

    if ( ! board.isKeepPlaying() && board.isVictory()) {
        gameMessageView.showVictory( ! board.isGameOver());
    } else if (board.isGameOver()) {
        gameMessageView.showGameOver();
    }

    boardView.showTileMovement(board.getTilePaths());
    boardView.showMergedTiles(board.getMergedTiles(), board.getTileNum());
}

function updateSomeLocalStorageData() {
    localStorageManager.setItem('score', board.getScore());
    localStorageManager.setItem('bestScore', board.getBestScore());
    localStorageManager.setItem('tileNum', board.getTileNum());
}

function removeSomeLocalStorageData() {
    localStorageManager.removeItem('score');
    localStorageManager.removeItem('tileNum');
    localStorageManager.removeItem('keepPlaying');
}

function keydownHandler(event) {
    if (( ! board.isKeepPlaying() && board.isVictory()) || board.isGameOver()) {
        return;
    }

    let directionCode = event.key || 's' + event.direction;
    switch (directionCode.toLowerCase()) {
    case 'w':
    case 'arrowup':
    case 's' + Hammer.DIRECTION_UP:
        board.slideUp();
        break;
    case 'd':
    case 'arrowright':
    case 's' + Hammer.DIRECTION_RIGHT:
        board.slideRight();
        break;
    case 's':
    case 'arrowdown':
    case 's' + Hammer.DIRECTION_DOWN:
        board.slideDown();
        break;
    case 'a':
    case 'arrowleft':
    case 's' + Hammer.DIRECTION_LEFT:
        board.slideLeft();
        break;
    }

    if (! ['w', 'd', 's', 'a', 's2', 's4', 's8', 's16','ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(directionCode)
     || ! board.isPushable()) {
        return;
    }

    if (directionCode.startsWith('Arrow')) {
        event.preventDefault();
    }

    board.randomAppearTiles();
    updateSomeLocalStorageData();
    visualize();

    if (board.isGameOver()) {
        removeSomeLocalStorageData();
    }
}

function initializeBoardData() {
    board.init({
        score: localStorageManager.getItemOrDefault('score', 0),
        bestScore: localStorageManager.getItemOrDefault('bestScore', 0),
        tileNum: localStorageManager.getItemOrDefault('tileNum', null),
        keepPlaying: localStorageManager.getItemOrDefault('keepPlaying', false),
    });
}

function clickHandler(event) {
    if (event.target === document.getElementById('restart-btn')
     || event.target === document.getElementById('retry-btn')) {
        gameMessageView.reset();
        removeSomeLocalStorageData();
        initializeBoardData();
        visualize();
    } else if (event.target === document.getElementById('keep-playing-btn')) {
        gameMessageView.reset();
        board.keepPlaying();
        localStorageManager.setItem('keepPlaying', true);
    }
}

addLoadEvent(function() {
    initializeBoardData();
    visualize();

    let gameContainer = document.getElementById('game-container');
    let hammer = new Hammer(gameContainer);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on('swipe', keydownHandler);
    
    gameContainer.addEventListener('keydown', keydownHandler, false);
    document.addEventListener('click', clickHandler, false);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/2048-game/sw.js', { scope: '/2048-game/' }).then(reg => {
            console.log('Registration succeeded. Scope is', reg.scope);
        }).catch(error => {
            console.log('Registration failed with', error);
        })
    }
});