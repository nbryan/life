function Life(board) {
    if (board) {
        this.rows = board.length;
        this.cols = board[0].length;
        this.board = Life.cleanBoard(board);
    } else {
        this.rows = 5;
        this.cols = 5;
        this.board = Life.createEmptyBoard(this.rows, this.cols);
    }
}

Life.prototype.tick = function() {
    var successor = Life.createEmptyBoard(this.rows, this.cols);
    
    for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
            var neighbors = this.neighbors(r, c);
            if (this.board[r][c]) {
                if (neighbors < 2 || neighbors > 3) {
                    successor[r][c] = false;
                } else {
                    successor[r][c] = true;
                }
            } else {
                if (neighbors == 3) {
                    successor[r][c] = true;
                }
            }
        }
    }
    
    this.board = successor;
    return this.toString();
}

Life.prototype.neighbors = function(row, col) {
    var minRow = row > 0 ? row - 1 : 0;
    var maxRow = row < this.board.length - 1 ? row + 1 : this.board.length - 1;
    var minCol = col > 0 ? col - 1 : 0;
    var maxCol = col < this.board[row].length - 1 ? col + 1 : this.board[row].length - 1;
    
    var neighbors = 0;
    for (var r = minRow; r <= maxRow; r++) {
        for (var c = minCol; c <= maxCol; c++) {
            if ((r != row || c != col) && this.board[r][c]) {
                neighbors++;
            }
        }
    }
    return neighbors;
}

Life.prototype.toString = function() {
    var s = "";
    for (var r = 0; r < this.rows; r++) {
        s += "["
        for (var c = 0; c < this.cols; c++) {
            s += " " + (this.board[r][c] ? String.fromCharCode(8226) : " ") + " ";
            if (c < this.cols - 1) {
                s += "|"
            }
        }
        s += "]\n";
    }
    return s;
}

Life.createEmptyBoard = function(rows, cols) {
    board = new Array(rows);
    for (var r = 0; r < rows; r++) {
        board[r] = new Array(cols);
        for (var c = 0; c < cols; c++) {
            board[r][c] = false;
        }
    }
    return board;
}

Life.cleanBoard = function(board) {
    var rows = board.length;
    var cols = board[0].length;
    
    clean = Life.createEmptyBoard(rows, cols);
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            clean[r][c] = board[r][c] ? true : false;
        }
    }
    
    return clean;
}