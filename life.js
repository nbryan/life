function Life(rows, cols) {
    this.board = Life.createEmptyBoard(rows, cols)
}

Life.prototype.tick = function() {
    var rows = this.board.length;
    var cols = this.board[0].length
    
    var successor = Life.createEmptyBoard(rows, cols);
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
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

Life.prototype.cell = function(row, col) {
    return this.board[row][col];
}

Life.prototype.setCell = function(row, col, alive) {
    this.board[row][col] = alive;
} 

Life.prototype.toString = function() {
    var s = "";
    for (var r = 0; r < this.board.length; r++) {
        s += "["
        for (var c = 0; c < this.board[r].length; c++) {
            s += " " + (this.board[r][c] ? String.fromCharCode(8226) : " ") + " ";
            if (c < this.board[r].length - 1) {
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
