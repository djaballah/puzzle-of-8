function inversionCount(arr) {
    let count = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] != 0 && arr[i] > arr[j]){
                count++;
            }
        }
    }
    return count;
}

function boardToArray(board) {
    let arr = [];
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 0; ++j) {
            arr.push(board[i][j]);
        }
    }
    return arr;
}

function isSolvable(board) {
    let arr = boardToArray(board);
    let count = inversionCount(arr);
    return (count % 2) == 0;
}

function isBlank(tile) {
    console.log(tile);
    return tile == 0;
};


class Board {
    constructor() {
        this.blankI = null;
        this.blankJ = null;
        this.board = this.initBoard();
        while(! isSolvable(this.board)) {
            this.board = this.initBoard();
        }
    }

    initBoard() {
        const tiles = [
            0, 1, 2, 3, 4, 5, 6, 7, 8
        ]
        const result = [];
        let k = 0;
        for (var i = 0; i < 3; i++){
            let row = [];
            for (var j = 0; j < 3; j++) {
                let index = Math.floor(Math.random() * tiles.length);
                row.push(tiles[index]);
                if (tiles[index] == 0) {
                    this.blankI = i;
                    this.blankJ = j;
                }
                tiles.splice(index, 1);
            }
            result.push(row);
        };
        console.log(result);
        return result;
    }

    drawBoard() {
        const boardGame = document.getElementById("game-board");
        let top = 5;
        for (let i = 0; i < 3; i++) {
            let left = 10;
            for (let j = 0; j < 3; j++){
                let tile = document.createElement('div');
                tile.setAttribute('class', 'tile');
                tile.style.left = left + 'px';
                tile.style.top = top + 'px';
                left += 160;
                tile.setAttribute('id', this.board[i][j]);
                if (this.board[i][j] == 0) {
                    tile.classList.add('blank');
                }
                let tile_text = document.createElement('div');
                tile_text.setAttribute('class', 'tile-text')
                tile_text.innerText = this.board[i][j];
                tile.appendChild(tile_text);
                boardGame.appendChild(tile);
            }
            top += 160;
        }
    }

    async moveBlankDown() {
        console.log('Down')
        const blankTile = document.getElementById('0');
        const tileBelowId = this.board[this.blankI + 1][this.blankJ];
        const tileBelow = document.getElementById(String(tileBelowId));

        let blankInitialPos = parseInt(blankTile.style.top);
        let blankPos = blankInitialPos;
        let belowInitialPosition = parseInt(tileBelow.style.top);
        let belowPos = belowInitialPosition;

        let promis = new Promise((res, rej) => {
            setInterval(function() {
                if (blankPos < blankInitialPos + 160) {
                    blankPos += 2;
                    blankTile.style.top = blankPos + 'px';
                    belowPos -= 2;
                    tileBelow.style.top = belowPos + "px";
                }
                else {
                    return res('1');
                }
            }, 50)
        });
        let result = await promis;


        let tempBlank = this.board[this.blankI][this.blankJ];
        this.board[this.blankI][this.blankJ] = this.board[this.blankI + 1][this.blankJ];
        this.board[this.blankI + 1][this.blankJ] = tempBlank;
        this.blankI = this.blankI + 1;

    }

    async moveBlankUp() {
        console.log('Up');
        const blankTile = document.getElementById('0');
        const tileBelowId = this.board[this.blankI - 1][this.blankJ];
        const tileBelow = document.getElementById(String(tileBelowId));

        let blankInitialPos = parseInt(blankTile.style.top);
        let blankPos = blankInitialPos;
        let belowInitialPosition = parseInt(tileBelow.style.top);
        let belowPos = belowInitialPosition;

        let promis = new Promise((res, rej) => {
            setInterval(function() {
                if (blankPos > blankInitialPos - 160) {
                    blankPos -= 2;
                    blankTile.style.top = blankPos + 'px';
                    belowPos += 2;
                    tileBelow.style.top = belowPos + "px";
                }
                else {
                    return res('1');
                }
            }, 50)
        });
        let result = await promis;

        let tempBlank = this.board[this.blankI][this.blankJ];
        this.board[this.blankI][this.blankJ] = this.board[this.blankI - 1][this.blankJ];
        this.board[this.blankI - 1][this.blankJ] = tempBlank;
        this.blankI = this.blankI - 1;
    }

    async moveBlankRight() {
        console.log('right');
        const blankTile = document.getElementById('0');
        const tileBelowId = this.board[this.blankI][this.blankJ + 1];
        const tileBelow = document.getElementById(String(tileBelowId));

        let blankInitialPos = parseInt(blankTile.style.left);
        let blankPos = blankInitialPos;
        let belowInitialPosition = parseInt(tileBelow.style.left);
        let belowPos = belowInitialPosition;

        let promis = new Promise((res, rej) => {
            setInterval(function() {
                if (blankPos < blankInitialPos + 160) {
                    blankPos += 2;
                    blankTile.style.left = blankPos + 'px';
                    belowPos -= 2;
                    tileBelow.style.left = belowPos + "px";
                }
                else {
                    return res('1');
                }
            }, 50)
        });
        let result = await promis;

        let tempBlank = this.board[this.blankI][this.blankJ];
        this.board[this.blankI][this.blankJ] = this.board[this.blankI][this.blankJ + 1];
        this.board[this.blankI][this.blankJ + 1] = tempBlank;
        this.blankJ = this.blankJ + 1;
    }

    async moveBlankLeft() {
        console.log('left');
        const blankTile = document.getElementById('0');
        const tileBelowId = this.board[this.blankI][this.blankJ - 1];
        const tileBelow = document.getElementById(String(tileBelowId));

        let blankInitialPos = parseInt(blankTile.style.left);
        let blankPos = blankInitialPos;
        let belowInitialPosition = parseInt(tileBelow.style.left);
        let belowPos = belowInitialPosition;

        let promis = new Promise((res, rej) => {
            setInterval(function() {
                if (blankPos > blankInitialPos - 160) {
                    blankPos -= 2;
                    blankTile.style.left = blankPos + 'px';
                    belowPos += 2;
                    tileBelow.style.left = belowPos + "px";
                }
                else {
                    return res('1');
                }
            }, 50)
        });
        let result = await promis;

        let tempBlank = this.board[this.blankI][this.blankJ];
        this.board[this.blankI][this.blankJ] = this.board[this.blankI][this.blankJ - 1];
        this.board[this.blankI][this.blankJ - 1] = tempBlank;
        this.blankJ -= 1;
    }

}

const boardGame = new Board();
boardGame.drawBoard();
async function solve(path) {
    console.log('solving');
    let a = {
        "DOWN": boardGame.moveBlankDown.bind(boardGame),
        "RIGHT": boardGame.moveBlankRight.bind(boardGame),
        "UP": boardGame.moveBlankUp.bind(boardGame),
        "LEFT": boardGame.moveBlankLeft.bind(boardGame)
    }
    for (mv of path) {
        console.log(mv);
        await a[mv]();
    }
}

btn = document.getElementById("solve-button");
btn.addEventListener("click", async () => {
    console.log('clicked');
    console.log(boardGame.board.flat());
    let res = await fetch(
        'https://0fl5l969mj.execute-api.us-east-2.amazonaws.com/dev/solution',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cors: true,
            body: JSON.stringify({data: boardGame.board.flat()})
        });
    let data = await res.json();
    console.log(JSON.parse(data.body));
    await solve(JSON.parse(data.body));
});

//solve();