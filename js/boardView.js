let boardView;

addLoadEvent(function() {
    let tileContainer = document.getElementById('tile-container');
    let fromPrefix = 'tile-from-position-';
    let toPrefix = 'tile-to-position-';

    boardView =  {
        clear() {
            removeAllChildren(tileContainer);
        },

        showNewTiles(newTiles, tileNum) {
            newTiles.forEach(tilePos => {
                let [i, j] = tilePos;
                let newTile = document.createElement('div');
                newTile.textContent = tileNum[i][j];
                newTile.classList.add('tile', 'tile-' + tileNum[i][j], fromPrefix + i + '-' + j, 'tile-new');
                tileContainer.appendChild(newTile);
            });
        },

        showTileMovement(tilePaths) {
            let oldTiles = [];
            tilePaths.forEach(path => {
                let from = path.from;
                let number = path.number;
                let oldTile = document.createElement('div');
                oldTile.textContent = number;
                oldTile.classList.add('tile', 'tile-' + number, fromPrefix + from[0] + '-' + from[1]);
                tileContainer.appendChild(oldTile);
                oldTiles.push(oldTile);
            });
            tileContainer.getClientRects(); // force repaint of an element
            tilePaths.forEach((path, i) => {
                let to = path.to;
                oldTiles[i].classList.add(toPrefix + to[0] + '-' + to[1]);
            });
        },

        showMergedTiles(mergedTiles, tileNum) {
            mergedTiles.forEach(mergedTilePos => {
                let [i, j] = mergedTilePos;
                let mergedTile = document.createElement('div');
                mergedTile.textContent = tileNum[i][j];
                mergedTile.classList.add('tile', 'tile-' + tileNum[i][j], fromPrefix + i + '-' + j, 'tile-merged');
                tileContainer.appendChild(mergedTile);
            });
        }
    }
});