
$(document).ready(function() {
    
    ttt.initializeBoard();

});


var ttt = (function() {

    var boardId = 'ttt-board';
    var boardDimensions = 3;
    var currentMove = 0;
    var currentPlayer = 'X';
    var gameActive = true;
    
    return {
        initializeBoard: function() {
            var $board = $('#ttt-board');
            $board.empty();

            var $table = $('<table />').appendTo($board);
            var $tbody = $('<tbody />').appendTo($table);
            for (var y = 1; y < (boardDimensions + 1); y++) {
                var $row = $('<tr>').appendTo($tbody);
                for (var x = 1; x < (boardDimensions + 1); x++) {
                    var cellId = "cell" + x + "-" + y;
                    console.log("Creating cell: ", cellId);
                    var $cell = $('<td>', {id: cellId, 'data-x': x, 'data-y': y, 'data-state': '', class: 'ttt-empty'}).appendTo($row);
                    $cell.click(ttt.makeMove);
                }
            }
    
            ttt.announceState();
        },
        announceState: function() {
            var $announce = $("#ttt-announce");
            $announce.html("<h1>Player " + currentPlayer + "'s Turn</h1>");
        },
        getBoardState: function() {
            var state = [];
            var msg = "";
            for (var y = 1; y < (boardDimensions + 1); y++) {
                var rowState = [];
                for (var x = 1; x < (boardDimensions + 1); x++) {
                    var value = ttt.getCellState(x,y);
                    rowState.push(value);
                    msg += value || "-";
                }
                state.push(rowState);
                msg += "\n";
            }
            console.log("Board state: \n", msg);
            return state;
        },
        getCellState: function(x, y) {
            var selector = "[data-x='" + x + "'][data-y='" + y + "']";
            var $cell = $(selector);
            var value = $cell.attr('data-state');
            console.log("getCellState X:", x, " Y:", y, " value: '" + value + "' selector: ", selector);
            return value;
        },
        checkForWin: function() {
            var state = ttt.getBoardState();
            //TODO: do this!

            //horizontal lines
            
            //vertical lines
            
            //diagonal
        },
        makeMove: function(e) {
            if (gameActive !== true) return;
            
            currentMove++;

            $cell = $(e.currentTarget);
            console.log("current cell: ", $cell);
            
            var cellState = $cell.attr("data-state");
            console.log("clicked cell state: ", cellState);
            
            if (cellState !== "") {
                ttt.logMove("Illegal move");
                return;
            }
    
            $cell.html(currentPlayer);
            $cell.attr("data-state", currentPlayer);
            ttt.logMove("Player ", currentPlayer, " clicked: ", $cell.attr("id"));
            ttt.announceState();
            
            ttt.checkForWin();
            currentPlayer = (currentPlayer === 'X') ? "O" : "X";
        },
        logMove: function() {
            var message = Array.prototype.slice.call(arguments).join("");
            
            var $log = $('#ttt-log');
            var $move = $("<div>", {id: "ttt-move-" + currentMove}).prependTo($log);
            $move.append("<h1>" + currentMove + "</h1>");
            $move.append(message);
            
        }
    }
    
})();
