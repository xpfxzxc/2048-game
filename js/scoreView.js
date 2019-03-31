let scoreView;

addLoadEvent(function() {
    let scoreContainer = document.getElementById('score-container');
    let bestScoreContainer = document.getElementById('best-score-container');

    scoreView = {
        updateScore(score, addedScore = 0) {
            scoreContainer.firstChild.nodeValue = score;
            if (addedScore > 0) {
                if (scoreContainer.lastChild.nodeName.toLowerCase() === 'div') {
                    scoreContainer.removeChild(scoreContainer.lastChild);
                }
                let scoreAddition = document.createElement('div');
                scoreAddition.textContent = '+' + addedScore;
                scoreAddition.classList.add('score-addition');
                scoreContainer.appendChild(scoreAddition);
            }
        },

        updateBestScore(bestScore) {
            bestScoreContainer.textContent = bestScore;
        },
    };
});