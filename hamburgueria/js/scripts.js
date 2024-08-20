// ELEMENTOS HTML
const divCarp = document.querySelector("#cardapio");
const divItens = document.querySelector("#itens");
const divTotal = document.querySelector("#vlrTotal");

// DADOS DOS DONUTS (dados locais)
const donuts = [
    {
        id: 1,
        nome: "Donut de Chocolate",
        descricao: "Cobertura de chocolate, granulado",
        caminhoimg: "imagens/donut1.jpg",
        preco: 5.00
    },
    {
        id: 2,
        nome: "Donut Glaceado",
        descricao: "Cobertura glaceada, confetes coloridos",
        caminhoimg: "imagens/donut2.jpg",
        preco: 5.50
    },
    {
        id: 3,
        nome: "Donut de Framboesa",
        descricao: "Recheio de framboesa, açúcar de confeiteiro",
        caminhoimg: "imagens/donut3.jpg",
        preco: 6.00
    },
    {
        id: 4,
        nome: "Donut de Baunilha",
        descricao: "Cobertura de baunilha, sprinkles coloridos",
        caminhoimg: "imagens/donut4.jpg",
        preco: 5.50
    },
    {
        id: 5,
        nome: "Donut com Caramelo",
        descricao: "Cobertura de caramelo, sal grosso",
        caminhoimg: "imagens/donut5.jpg",
        preco: 6.50
    },
    {
        id: 6,
        nome: "Donut de Café",
        descricao: "Recheio de café expresso, cobertura de chocolate",
        caminhoimg: "imagens/donut6.jpg",
        preco: 6.00
    },
    {
        id: 7,
        nome: "Donut de Morango",
        descricao: "Cobertura de morango, pedaços de morango",
        caminhoimg: "imagens/donut7.jpg",
        preco: 5.50
    },
    {
        id: 8,
        nome: "Donut com Creme",
        descricao: "Recheio de creme, cobertura de açúcar",
        caminhoimg: "imagens/donut8.jpg",
        preco: 6.00
    }
];

// ACUM
let totalSacola = 0.0;

// ARRAY DONUTS
const donutsSelecionados = [];

// CLASSES
class Donut {
    constructor(objDonut) {
        this.id = objDonut.id;
        this.nome = objDonut.nome;
        this.descricao = objDonut.descricao;
        this.caminhoimg = objDonut.caminhoimg;
        this.preco = objDonut.preco;
        this.quantidade = 1;
    }
}

// FUNÇÕES
const addDonut = (obj) => {
    let posicaoArray = -1;

    for (let i in donutsSelecionados) {
        if (donutsSelecionados[i].id == obj.id) {
            posicaoArray = i;
            break;
        }
    }

    if (posicaoArray == -1) {
        let objDonut = new Donut(obj);
        donutsSelecionados.push(objDonut);
    } else {
        donutsSelecionados[posicaoArray].quantidade += 1;
    }

    listaDonuts();
    novoValor();
};

const novoValor = () => {
    totalSacola = 0.0;
    for (let obj of donutsSelecionados) {
        totalSacola += obj.preco * obj.quantidade;
    }

    divTotal.innerHTML = `${totalSacola.toFixed(2).replace(".", ",")}`;
};

const removeDonut = (indice) => {
    let objDonut = donutsSelecionados[indice];
    totalSacola -= objDonut.preco * objDonut.quantidade;
    donutsSelecionados.splice(indice, 1);
    listaDonuts();
    novoValor();
};

const listaDonuts = () => {
    divItens.innerHTML = "";

    donutsSelecionados.map((elem, i) => {
        const divDonutSelecionado = document.createElement("div");
        divDonutSelecionado.setAttribute("class", "item");

        let vlrDonut = elem.preco * elem.quantidade;

        divDonutSelecionado.innerHTML = `
            <div class="descSacola">${elem.nome}</div>
            <div class="quantidade">${elem.quantidade}</div>
            <div class="vlrSacola">R$ ${elem.preco.toFixed(2).replace(".", ",")}</div>
            <div class="totItem vlrSacola">R$ ${vlrDonut.toFixed(2).replace(".", ",")}</div>
            <div class="btnRemover">
                <img src="imagens/remover.png" alt="Remover Item" title="Remover Item">
            </div>
        `;

        const imgRemover = divDonutSelecionado.querySelector(".btnRemover img");
        imgRemover.addEventListener("click", () => {
            removeDonut(i);
        });

        divItens.appendChild(divDonutSelecionado);
    });
};

const exibeDonuts = () => {
    divCarp.innerHTML = "";

    donuts.map((elem) => {
        const divCard = document.createElement("div");
        divCard.setAttribute("class", "card");

        const divImgCard = document.createElement("div");
        divImgCard.setAttribute("class", "imgCard");

        const imgCard = document.createElement("img");
        imgCard.setAttribute("src", elem.caminhoimg);

        divImgCard.appendChild(imgCard);

        const divDescricao = document.createElement("div");
        divDescricao.setAttribute("class", "descricao");
        divDescricao.innerHTML = elem.nome;

        const divCardapio = document.createElement("div");
        divCardapio.setAttribute("class", "detalhe");
        divCardapio.innerHTML = elem.descricao;

        const divValorDonut = document.createElement("div");
        divValorDonut.setAttribute("class", "valor");
        divValorDonut.innerHTML = `R$ ${elem.preco.toFixed(2).replace(".", ",")}`;

        const divBtn = document.createElement("div");
        divBtn.setAttribute("class", "btnAdd");

        const btnButton = document.createElement("button");
        btnButton.setAttribute("class", "add");
        btnButton.innerHTML = "Adicionar";
        btnButton.addEventListener("click", () => {
            addDonut(elem);
        });

        divBtn.appendChild(btnButton);

        divCard.appendChild(divImgCard);
        divCard.appendChild(divDescricao);
        divCard.appendChild(divCardapio);
        divCard.appendChild(divValorDonut);
        divCard.appendChild(divBtn);

        divCarp.appendChild(divCard);
    });
};

// Inicializa a exibição dos donuts
exibeDonuts();
