class TicTacToe {
    constructor() {
        this.turnLimit = 9;
        this.turnIndex = 0;
        this.Player1 = { name: 'Player1', mark: 'x' };
        this.Player2 = { name: 'Player2', mark: 'o' };
        this.currentPlayer = this.Player1;
        this.winner = null;
        this.gameState = 'gaming';
        this.gameField = Array(  
            Array( 3 ).fill( null ),
            Array( 3 ).fill( null ),
            Array( 3 ).fill( null ),
        );
    }

    isRowFilled( rowIndex, playerMark ){
        let isFilled = true;
        for( let i=0; i<3 && isFilled; i++ ){
            if( this.gameField[ rowIndex ][ i ] !== null ){
                if( this.gameField[ rowIndex ][ i ] !== playerMark ){
                    isFilled = false; 
                }
            } else {
                isFilled = false;
            }
        }
        return isFilled;
    }

    isColFilled( colIndex, playerMark ){
        let isFilled = true;
        for( let i=0; i<3 && isFilled ; i++ ){
            if( this.gameField[ i ][ colIndex ] !== null ){
                if( this.gameField[ i ][ colIndex ] !== playerMark ){
                    isFilled = false;
                }
            } else {
                isFilled = false;
            }
        }
        return isFilled;
    }

    hasFilledRow( playerMark ){
        let hasRows = false;
        for( let i=0; i<3; i++ ){
            hasRows = hasRows || this.isRowFilled( i, playerMark );
        }
        return hasRows;
    }

    hasFilledCol( playerMark ){
        let hasCols = false;
        for( let i=0; i<3; i++ ){
            hasCols = hasCols || this.isColFilled( i, playerMark );
        }
        return hasCols;
    }

    hasFilledDiag( playerMark ){
        let isStraightDiagFilled = true;
        let isReverseDiagFilled = true;

        for( let i1=0; i1<3 && isStraightDiagFilled; i1++ ){
            if( this.gameField[ i1 ][ i1 ] !== null ){
                if( this.gameField[ i1 ][ i1 ] !== playerMark ){
                    isStraightDiagFilled = false;
                }
            } else {
                isStraightDiagFilled = false;
            }
        }

        for( let i2=0; i2<3 && isReverseDiagFilled; i2++ ){
            if( this.gameField[ 2 - i2 ][ i2 ] !== null ){
                if( this.gameField[ 2 - i2 ][ i2 ] !== playerMark ){
                    isReverseDiagFilled = false;
                }
            } else {
                isReverseDiagFilled = false;
            }
        }

        return isStraightDiagFilled || isReverseDiagFilled ;
    }

    hasWon( ){
        return (
            this.hasFilledRow( this.currentPlayer.mark ) || 
            this.hasFilledCol( this.currentPlayer.mark ) ||
            this.hasFilledDiag( this.currentPlayer.mark )
        );
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayer.mark;
    }

    nextTurn(rowIndex, columnIndex) {
        if( this.gameField[ rowIndex ][ columnIndex ] == null ){
            this.turnIndex += 1;
            this.gameField[ rowIndex ][ columnIndex ] = this.currentPlayer.mark;
            if( this.hasWon() ){
                this.winner = this.currentPlayer;
                this.gameState = 'won';
                // this.turnLimit = this.turnIndex;
            } else if( this.turnIndex >= this.turnLimit ){
                this.gameState = 'draw';
            }

            if( this.currentPlayer.name === 'Player1' ) {
                this.currentPlayer = this.Player2;
            } else {
                this.currentPlayer = this.Player1;
            }
        }
    }

    isFinished() {
        return ( this.gameState !== 'gaming' ) ;
    }

    getWinner() {
        if( this.winner ){
            return this.winner.mark;
        } else {
            return null;
        }
    }

    noMoreTurns() {
        return ( this.turnIndex >= this.turnLimit );
    }

    isDraw() {
        return ( this.gameState == 'draw' );
    }

    getFieldValue(rowIndex, colIndex) {
        return( this.gameField[ rowIndex ][ colIndex ] )
    }
}

module.exports = TicTacToe;
