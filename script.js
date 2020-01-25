/*
CHARACTERS SET
○    ➞ blank
●    ➞ ship
☼    ➞ miss
☀   ➞ hit
*/

class Battleship {
    _blank = '○';
    _ship  = '●';
    _miss  = '☼';
    _hit  = '☀';

    _board;
    _hits = 0;
    _sunk = 0;
    _points = 0;

    _hitsSheep = 0;

	constructor(scheme, input) {
        this._board = this._initBoard();
        this._board = this._addShips(this._board, scheme);
        this._board = this._makeShoots(this._board, input);
        // console.log(this._board);
    }

    _makeShoots(board, input) {
        input = this._transformLeter(input);
        for (let i = 0; i < input.length; i++) {
            if (board[input[i][0]][input[i][1] - 1] == this._ship) {
                board[input[i][0]][input[i][1] - 1] = this._hit;
                this._hits++;
                this._points++;
            }
            else{
                board[input[i][0]][input[i][1] - 1] = this._miss;
            }
                      
            
        }

        return board;
    }

    _transformLeter(arr){
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i]
            .replace('A', 0)
            .replace('B', 1)
            .replace('C', 2)
            .replace('D', 3)
            .replace('E', 4);   
        }

        return arr;
    }

    _addShips(board, scheme){
        scheme = this._transformLeter(scheme);

        for (let i = 0; i < scheme.length; i++) {
            board[scheme[i][0]][scheme[i][1] - 1] = this._ship;           
        }

        return board;
    }

    _initBoard(){
        let clearBoard = [
            ['○','○','○','○','○'],
            ['○','○','○','○','○'],
            ['○','○','○','○','○'],
            ['○','○','○','○','○'],
            ['○','○','○','○','○']
        ]

        return clearBoard;
    }

	board() {
        return this._board;
    }

	hits() {
        return this._hits;
    }
	sunk() {

        for (let i = 0; i < this._board.length; i++) {
            for (let y = 0; y < this._board[i].length - 1; y++) {
                if (this._board[i][y] == this._hit && this._board[i][y + 1] == this._hit) {
                    this._sunk++;
                    this._points = this._points + 2;
                }
            }
        }
        for (let i = 0; i < this._board.length - 1; i++) {
            for (let y = 0; y < this._board[i].length; y++) {
                if (this._board[i][y] == this._hit && this._board[i + 1][y] == this._hit) {
                    this._sunk++;
                    this._points = this._points + 2;
                }
            }
        }
        return this._sunk;
    }
    points() {
        return this._points;
    }
}

let scheme =
["A1", "C1", "B2",
"B3", "D2", "E2",
"E4", "E5", "A5"];

let input = ["A1", "B2", "C3", "D4", "E5", "E4"]

let bs = new Battleship(scheme, input);
console.log(bs.board());
console.log("hits", bs.hits());
console.log("sunk", bs.sunk());
console.log("hits", bs.hits());
console.log("points", bs.points());

