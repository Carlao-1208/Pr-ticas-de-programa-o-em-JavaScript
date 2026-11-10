const formatarMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const linhasProdutos = document.querySelectorAll("tbody tr[data-product-id]");
const subtotalElemento = document.getElementById("subtotal");

function atualizarValores() {
    let subtotalEmCentavos = 0;

    linhasProdutos.forEach((linha) => {
        const idProduto = linha.dataset.productId;
        const precoEmCentavos = Number(linha.dataset.priceCents);
        const quantidade = Number(linha.dataset.quantity || 0);
        const totalEmCentavos = precoEmCentavos * quantidade;
        const quantidadeElemento = document.getElementById(`qtd_${idProduto}`);
        const totalElemento = document.getElementById(`total_${idProduto}`);
        const botaoDiminuir = linha.querySelector('[data-action="decrease"]');

        quantidadeElemento.textContent = quantidade;
        totalElemento.textContent = formatarMoeda.format(totalEmCentavos / 100);
        botaoDiminuir.disabled = quantidade === 0;
        subtotalEmCentavos += totalEmCentavos;
    });

    subtotalElemento.textContent = formatarMoeda.format(subtotalEmCentavos / 100);
}

document.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-action]");

    if (!botao) {
        return;
    }

    const linha = botao.closest("tr[data-product-id]");

    if (!linha) {
        return;
    }

    const quantidadeAtual = Number(linha.dataset.quantity || 0);
    linha.dataset.quantity = botao.dataset.action === "increase"
        ? quantidadeAtual + 1
        : Math.max(0, quantidadeAtual - 1);

    atualizarValores();
});

atualizarValores();
