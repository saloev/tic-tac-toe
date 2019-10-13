class TicTacToe {
  constructor() {}

  getCurrentPlayerSymbol() {
    this.currentPlayerSymbol = this.currentPlayerSymbol
      ? this.currentPlayerSymbol
      : "x";
    return this.currentPlayerSymbol;
  }

  nextTurn(rowIndex, columnIndex) {
    const dispatchPlayerSymbol = {
      x: "o",
      o: "x"
    };

    const changeCurrentPlayerSymbol = () => {
      if (this.currentPlayerSymbol) {
        this.battlefield[rowIndex][columnIndex] = this.currentPlayerSymbol;
        this.currentPlayerSymbol =
          dispatchPlayerSymbol[this.currentPlayerSymbol];
      } else {
        this.currentPlayerSymbol = "x";
        this.battlefield[rowIndex][columnIndex] = this.currentPlayerSymbol;
        this.currentPlayerSymbol =
          dispatchPlayerSymbol[this.currentPlayerSymbol];
      }
    };

    if (!this.battlefield) {
      this.battlefield = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];

      changeCurrentPlayerSymbol();
    } else if (!this.battlefield[rowIndex][columnIndex]) {
      changeCurrentPlayerSymbol();
    }
  }

  isFinished() {
    return this.isDraw() || this.getWinner() !== null;
  }

  getWinner() {
    let res = null;

    function checkWinner(filed) {
      return filed.some((row, index) => {
        const checkElem = row[0];
        const isWinner = row.every(
          elem => checkElem && elem && elem === checkElem
        );

        res = isWinner ? checkElem : null;

        return res;
      });
    }

    checkWinner(this.battlefield);

    if (res) {
      return res;
    }

    const diagonals = this.battlefield.reduce(
      (acc, arr, index) => {
        const [mainDiagonal, antiDiagonal] = [
          arr[index],
          arr[arr.length - index - 1]
        ];

        acc[0][index] = mainDiagonal;
        acc[1][index] = antiDiagonal;

        return acc;
      },
      [[], []]
    );

    checkWinner(diagonals);

    if (res) {
      return res;
    }

    const columns = this.battlefield.reduce(
      (acc, arr, index) => {
        const [firstColumn, secondColumn, thirdColumn] = [
          arr[0],
          arr[1],
          arr[2]
        ];

        acc[0][index] = firstColumn;
        acc[1][index] = secondColumn;
        acc[2][index] = thirdColumn;

        return acc;
      },
      [[], [], []]
    );

    checkWinner(columns);

    if (res) {
      return res;
    }

    return null;
  }

  noMoreTurns() {
    return this.battlefield.every(row => {
      return row.every(elem => elem !== null);
    });
  }

  isDraw() {
    return this.getWinner() === null && this.noMoreTurns();
  }

  getFieldValue(rowIndex, colIndex) {
    return this.battlefield[rowIndex][colIndex];
  }
}

module.exports = TicTacToe;
