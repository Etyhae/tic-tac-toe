document.addEventListener("DOMContentLoaded", () => {
    const winnerNotify = document.querySelector("#winner-notify");
    const winnerSpan = document.querySelector("#winner");
    const resetBtn = document.querySelector("#game-reset");

    const generateSquareMatrix = (size) => {
        let matrix = [];
        for (let rowIndex = 0; rowIndex < size; rowIndex++) {
            matrix.push([]);
            for (let colIndex = 0; colIndex < size; colIndex++) {
                matrix[rowIndex].push(null);
            }
        }
        return matrix;
    };

    const checkWin = (matrix) => {
        const size = matrix.length;
        let winConditions = [];

        // Горизонтальные и вертикальные проверки
        for (let i = 0; i < size; i++) {
            winConditions.push(matrix[i]); // Горизонтальные
            let col = [];
            for (let j = 0; j < size; j++) {
                col.push(matrix[j][i]);
            }
            winConditions.push(col); // Вертикальные
        }

        // Диагональные проверки
        let diag1 = [], diag2 = [];
        for (let i = 0; i < size; i++) {
            diag1.push(matrix[i][i]);
            diag2.push(matrix[i][size - i - 1]);
        }
        winConditions.push(diag1);
        winConditions.push(diag2);

        // Проверка на победу
        for (let condition of winConditions) {
            if (condition.every(cell => cell === 1)) {
                return 'x';
            } else if (condition.every(cell => cell === 0)) {
                return 'o';
            }
        }

        return null;
    };

    let field = generateSquareMatrix(3);
    let round = 0;

    const cells = document.querySelectorAll(".cell");
    cells.forEach(item => {
        item.addEventListener("click", (e) => {
            const cell = e.target;
            const row = parseInt(cell.getAttribute("data-row"));
            const col = parseInt(cell.getAttribute("data-col"));

            if (field[row][col] !== null) return; // Проверка на занятость клетки

            field[row][col] = round % 2 == 0 ? 1 : 0;
            cell.innerHTML = round % 2 == 0 ? "x" : "o";

            const winner = checkWin(field);
            if (winner) {
                winnerSpan.innerHTML = winner;
                winnerNotify.showModal();
                return;
            }

            round++;
            if (round === 9) {
                alert("Ничья");
            }
        });
    });

    resetBtn.addEventListener("click", () => {
        round = 0;
        cells.forEach(item => {
            item.innerHTML = "";
        })
        field = generateSquareMatrix(3);
        winnerNotify.close();
    })
});
