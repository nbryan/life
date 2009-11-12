var ROWS = 40;
var COLS = 60;

$(document).ready(function() {
    var life = new Life(ROWS, COLS);
    var running = false;
    var interval;

    start = function() {
        running = true;
        interval = setInterval(tick, 400);
        $("#start").hide();
        $("#stop").show();
    };

    stop = function() {
        running = false;
        clearInterval(interval);
        $("#stop").hide();
        $("#start").show();
    };

    tick = function() {
        life.tick();
        updateBoard();
    };

    toggleCell = function(row, col, element) {
        if (!running) {
            life.board[row][col] = !life.board[row][col];
            updateCell(element, life.board[row][col]);
        }
    };

    reset = function(board) {
        stop();
        if (board) {
            life = new Life(ROWS, COLS, eval(board));
        }
        else {
            life = new Life(ROWS, COLS);
        }
        updateBoard();
    };

    initBoard = function() {
        var board = "<table>";
            for (var row = 0; row < life.rows; row++) {
                board += "<tr>";
                for (var col = 0; col < life.cols; col++) {
                    board += "<td></td>";
                }
            board += "</tr>"
        }
        board += "</table>"
        $("#board").html(board);
    };

    initPatterns = function() {
        var options = "<option value=\"\">Empty</option>";
        for (group in Life.patternGroups) {
            options += "<optgroup label=\"" + group + "\">";
            for (pattern in Life.patternGroups[group]) {
                options += "<option value=\"" + Life.patternGroups[group][pattern] + "\">" + pattern + "</option>";
            }
            options += "</optgroup>";
        }
        $("#pattern").html(options)
    };

    updateBoard = function() {
        $("#board table tr").each(function(row) {
            $("td", this).each(function(col) {
                updateCell(this, life.board[row][col]);
            });
        });
    };

    updateCell = function(cell, alive) {
        $(cell).attr("class", alive ? "alive" : "dead")
    };

    initBoard();
    initPatterns();
    updateBoard(life);

    $("#start").click(start);
    $("#stop").click(stop);
    $("#reset").click(function() {
        reset($("#pattern").val());
    });
    $("#board table tr").each(function(row) {
        $("td", this).each(function(col) {
            $(this).click(function() {
                toggleCell(row, col, this);
            });
        });
    });
});