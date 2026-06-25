/* ===========================================================
   LISTA DE PRODUTOS
   ===========================================================
   Para ADICIONAR um produto novo: copia um objeto { } dentro
   da categoria certa e edita os campos. Não precisa tocar
   no index.html nem no script.js.

   Campos:
   - nome: aparece no card e no carrinho
   - preco: número (use ponto, não vírgula). Use 0 se ainda
            não tiver o preço definido (vai aparecer "A combinar")
   - imagem: link da foto (vazio "" = sem foto)
=========================================================== */

const PRODUTOS = {

    refrigerantes: {
        titulo: "🥤 Refrigerantes",
        itens: [
            { nome: "Coca-Cola 2L", preco: 12.99, imagem: "https://primefoodgt.com/wp-content/uploads/2020/04/coca-cola-2l.jpg" },
            { nome: "Coca-Cola da copa", preco: 9.99, imagem: "./4-2.png" },
        ]
    },

    whiskys: {
        titulo: "🥃 Whiskys",
        itens: [
            { nome: "Jack Daniel's", preco: 0, imagem: "./whisky_jack_daniels_1000ml_773_1_10237127e2f5dda92c4774902197c2ba.webp" },
            { nome: "White House", preco: 0, imagem: "./whisky_white_horse_700ml_569_2_2736d095caf35987d55295ff244efe4c.webp" },
            { nome: "Red Label", preco: 0, imagem: "./201-jpg.webp" },
        ]
    },

    cervejas: {
        titulo: "🍺 Cervejas",
        itens: [
            { nome: "Heineken Long Neck", preco: 7.99, imagem: "https://img.megaboxatacado.com.br/produto/1000X1000/202039_84063.jpg" },
            { nome: "Brahma Duplo Malte", preco: 4.99, imagem: "https://carrefourbrfood.vtexassets.com/arquivos/ids/106444563/cerveja-brahma-duplo-malte-puro-malte-350ml-lata-1.jpg?v=638144901422700000" },
        ]
    },

    energeticos: {
        titulo: "⚡ Energéticos",
        itens: [
            { nome: "Monster Energy", preco: 11.99, imagem: "https://www.bluedogbeverage.com/wp-content/uploads/2022/12/Monster-energy-drink.jpg" },
            { nome: "Baly 2L", preco: 13.00, imagem: "./213168-800-450.png" },
        ]
    },

    petiscos: {
        titulo: "🥜 Petiscos",
        itens: [
            { nome: "Amendoim Japonês", preco: 5.99, imagem: "https://savegnagoio.vtexassets.com/arquivos/ids/486704/AMENDOIMJAPONESMENDORATO150G1.jpg?v=638939046423470000" },
        ]
    },

    // quando o cardápio dos copões chegar, adiciona uma categoria nova aqui,
    // do mesmo jeito, e ela aparece automaticamente no site e na barra de categorias.

};
