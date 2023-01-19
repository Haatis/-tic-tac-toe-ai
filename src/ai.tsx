import { gameMove, getPossibleMoves, isWinning, isSpotOpen, P2 , P1} from "./GameUtil";


export const PLAYER_NAME = "Joona";

export function getNextMove(board: string[][], round: number): gameMove {
    const possibleMoves = getPossibleMoves(board);
  
//Check if there are any possible moves left, if not return the move which leads to a tie
if (round > 5){
for (let i = 0; i < possibleMoves.length; i++) {
    const move = possibleMoves[i];
    board[move.row][move.col] = P2;
    if (getPossibleMoves(board).length === 0) {
        board[move.row][move.col] = "";
        return move;
    }
    board[move.row][move.col] = "";
}
}

//Check if opponent can win in the next move, if so block it
for (let i = 0; i < possibleMoves.length; i++) {
    const move = possibleMoves[i];
    board[move.row][move.col] = P1;
    if (isWinning(board, P1)) {
        board[move.row][move.col] = "";
        return move;
    }
    board[move.row][move.col] = "";
}

//get the center spot if it is open
if (isSpotOpen(board, 1, 1)) {
    return { row: 1, col: 1 };
}

//if nothing works, just pick a random move from possiblemoves
const randomIndex = Math.floor(Math.random() * possibleMoves.length);
return possibleMoves[randomIndex];
}