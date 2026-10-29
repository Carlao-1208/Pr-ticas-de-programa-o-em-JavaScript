let tabuleiro = [];
let jogadorAtual = 1;
let jogoAtivo = true;
let board;
let aviso;

function iniciar() {
    board = document.getElementById("board");
    aviso = document.getElementById("aviso");

    tabuleiro = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    jogadorAtual = 1;
    jogoAtivo = true;

    aviso.textContent = "Vez do jogador 1";
    exibir();
}

function exibir() {
    let tabela = '<table cellpadding="10" border="1">';

    for (let i = 0; i < 3; i++) {
        tabela += "<tr>";

        for (let j = 0; j < 3; j++) {
            let marcador = "_";

            if (tabuleiro[i][j] === 1) {
                marcador = "O";
            } else if (tabuleiro[i][j] === -1) {
                marcador = "X";
            }

            tabela += `<td>${marcador}</td>`;
        }

        tabela += "</tr>";
    }

    tabela += "</table>";
    board.innerHTML = tabela;
}

function jogar() {
    if (!jogoAtivo) {
        aviso.textContent = "O jogo terminou. Atualize a página para jogar novamente.";
        return;
    }

    const linha = Number(document.getElementById("linha").value) - 1;
    const coluna = Number(document.getElementById("coluna").value) - 1;

    if (
        !Number.isInteger(linha) ||
        !Number.isInteger(coluna) ||
        linha < 0 ||
        linha > 2 ||
        coluna < 0 ||
        coluna > 2
    ) {
        aviso.textContent = "Informe uma linha e uma coluna entre 1 e 3.";
        return;
    }

    if (tabuleiro[linha][coluna] !== 0) {
        aviso.textContent = "Posição já ocupada. Tente novamente!";
        return;
    }

    tabuleiro[linha][coluna] = jogadorAtual === 1 ? 1 : -1;
    exibir();

    if (checarVitoria()) {
        aviso.textContent = `Jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;
        return;
    }

    const empate = tabuleiro.every(linhaAtual =>
        linhaAtual.every(posicao => posicao !== 0)
    );

    if (empate) {
        aviso.textContent = "Empate!";
        jogoAtivo = false;
        return;
    }

    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    aviso.textContent = `Vez do jogador ${jogadorAtual}`;
}

function checarVitoria() {
    const combinacoes = [
        ...tabuleiro,
        [tabuleiro[0][0], tabuleiro[1][0], tabuleiro[2][0]],
        [tabuleiro[0][1], tabuleiro[1][1], tabuleiro[2][1]],
        [tabuleiro[0][2], tabuleiro[1][2], tabuleiro[2][2]],
        [tabuleiro[0][0], tabuleiro[1][1], tabuleiro[2][2]],
        [tabuleiro[0][2], tabuleiro[1][1], tabuleiro[2][0]]
    ];

    return combinacoes.some(combinacao =>
        combinacao[0] !== 0 &&
        combinacao[0] === combinacao[1] &&
        combinacao[1] === combinacao[2]
    );
}