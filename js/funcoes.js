function calcular(operacao){
    const n1 = document.getElementById("n1").value
    const n2 = document.getElementById("n2").value

    let resultado
    switch(operacao){
        case "+" : resultado = Somar(n1, n2); break;
        case "-" : resultado = Subtrair(n1, n2); break;
        case "*" : resultado = Multiplicar(n1, n2); break;
        case "/" : resultado = Dividir(n1, n2); break;
    }
    document.getElementById('resultado'). innerHTML = " O resultado é " + resultado
}

function Somar (n1, n2){
    return Number(n1) + Number(n2)
}

function Subtrair(n1, n2){
    return Number(n1) - Number(n2)
}

function Multiplicar(n1, n2){
    return Number(n1) * Number(n2)
}

function Dividir(n1, n2){
    if(n2 == 0){
        console.error(" Não é possivel dicidir o número por 0")
        return null
    } else {
        return Number(n1) / Number(n2)
    }
}

const somaExpressao = function(n1 , n2){
    return n1 + n2
}

const somaArrow = (n1, n2) => n1 + n2
console.log( somaArrow(2,2))


