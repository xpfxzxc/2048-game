let board = function() {
    let score;
    let bestScore;
    let addedScore;
    let tileNum;
    let pushable;
    let tilePaths;
    let mergedTiles;
    let newTiles;
    let keepPlaying;

    function randomAppearTiles(n = 1) {
        let acceptableTile = [];
        newTiles = [];

        tileNum.forEach((x, i) => {
            x.forEach((y, j) => {
                if (y === 0) {
                    acceptableTile.push([i, j]);
                }
            });
        });

        choice(acceptableTile, n).forEach(tile => {
            let [i, j] = tile;
            tileNum[i][j] = (~~(Math.random() * 10)) < 9 ? 2 : 4;
            newTiles.push([i, j]);
        });
    }
    
    function transpose() {
        for (let i = 1; i < tileNum.length; i++) {
            for (let j = 0; j < i; j++) {
                let temp = tileNum[i][j];
                tileNum[i][j] = tileNum[j][i];
                tileNum[j][i] = temp;
            }
        }
    }
    
    function flip() {
        tileNum.forEach(row => row.reverse());
    }

    function transformPosition(pos, direction) {
        switch (direction) {
        case 'up':
            return [3 - pos[1], pos[0]];
        case 'right':
            return [pos[0], pos[1]];
        case 'down':
            return [pos[1], pos[0]];
        case 'left':
            return [pos[0], 3 - pos[1]];
        }
    }

    function addTilePath(from, to, number, direction) {
        tilePaths.push({
            from: transformPosition(from, direction),
            to: transformPosition(to, direction),
            number: number,
        });
    }
    
    function pushRight(direction) {
        pushable = false;
        tilePaths = [];
        mergedTiles = [];
        let oldScore = score;

        tileNum.forEach((row, i) => {
            let n = row.length;
            if (row[n - 1] !== 0) {
                addTilePath([i, n - 1], [i, n - 1], row[n - 1], direction);
            }
            for (let slow = n - 1, fast = n - 2; fast >= 0; fast--) {
                if (row[fast] === 0) continue;
                if (row[slow] === row[fast]) {
                    score += row[slow] + row[fast];
                    row[slow--] += row[fast];
                    row[fast] = 0;
                    pushable = true;
                    addTilePath([i, fast], [i, slow + 1], row[slow + 1]/2, direction)
                    mergedTiles.push(transformPosition([i, slow + 1], direction));
                } else if (row[slow] === 0) {
                    row[slow] = row[fast];
                    row[fast] = 0;
                    pushable = true;
                    addTilePath([i, fast], [i, slow], row[slow], direction);
                } else {
                    row[--slow] = row[fast];
                    if (slow - fast >= 1) {
                        row[fast] = 0;
                        pushable = true;
                    }
                    addTilePath([i, fast], [i, slow], row[slow], direction);
                }
            }
        });

        addedScore = score - oldScore;
        bestScore = Math.max(bestScore, score);
    }

    return {
        randomAppearTiles,

        init(data) {
            score = data.score;
            bestScore = data.bestScore;
            addedScore = 0;
            tileNum = data.tileNum || numArray([4, 4], 0);
            pushable = false;
            tilePaths = [];
            mergedTiles = [];
            newTiles = [];
            keepPlaying = data.keepPlaying;

            if ( ! data.tileNum) {
                randomAppearTiles(2);
            } else {
                for (let i = 0; i < tileNum.length; i++) {
                    for (let j = 0; j < tileNum[i].length; j++) {
                        if (tileNum[i][j] !== 0) {
                            newTiles.push([i, j]);
                        }
                    }
                }
            }
        },

        slideUp: function() {
            transpose();
            flip();
            pushRight('up');
            flip();
            transpose();
        },


        slideRight: function() {
            pushRight('right');
        },

        slideDown: function() {
            transpose();
            pushRight('down');
            transpose();
        },

        slideLeft: function() {
            flip();
            pushRight('left');
            flip();
        },

        isPushable: function() {
            return pushable;
        },
        
        getTileNum: function() {
            return Array.from(tileNum);
        },

        getTilePaths: function() {
            return Array.from(tilePaths);
        },

        getMergedTiles: function() {
            return Array.from(mergedTiles);
        },

        getNewTiles: function() {
            return Array.from(newTiles);
        },

        getScore: function() {
            return score;
        },

        getBestScore: function() {
            return bestScore;
        },

        getAddedScore: function() {
            return addedScore;
        },

        isGameOver: function() {
            let n = tileNum.length;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (tileNum[i][j] === 0) return false;
                    if (i < n - 1 && tileNum[i][j] === tileNum[i + 1][j]) return false;
                    if (j < n - 1 && tileNum[i][j] === tileNum[i][j + 1]) return false; 
                }
            }
            return true;
        },

        isVictory: function() {
            return tileNum.some(row => row.includes(2048));
        },

        isKeepPlaying: function() {
            return keepPlaying;
        },

        keepPlaying: function() {
            keepPlaying = true;
        },
    }
}();