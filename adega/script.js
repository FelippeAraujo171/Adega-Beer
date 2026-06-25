/* ===========================
   CONFIGURAÇÃO
=========================== */
const NUMERO_WHATSAPP = "5519991920097"; // troque aqui se mudar o número

// Ícone padrão por categoria, usado na barra de navegação
const ICONES_CATEGORIA = {
    refrigerantes: "🥤",
    whiskys: "🥃",
    cervejas: "🍺",
    energeticos: "⚡",
    petiscos: "🥜",
};

/* ===========================
   ESTADO DO CARRINHO
=========================== */
// Cada item: { nome, preco, quantidade }
let carrinho = [];

/* ===========================================================
   GERAÇÃO AUTOMÁTICA DA PÁGINA A PARTIR DE produtos.js
=========================================================== */
function montarPagina(){
    montarCategorias();
    montarSecoesDeProdutos();
}

function montarCategorias(){
    const lista = document.getElementById("categorias-lista");
    if(!lista) return;

    let html = "";
    Object.keys(PRODUTOS).forEach(chave => {
        const categoria = PRODUTOS[chave];
        const icone = ICONES_CATEGORIA[chave] || "🛒";
        const nomeExibido = categoria.titulo.replace(/^\S+\s/, ""); // remove o emoji do título pro botão

        html += `
            <li class="categoria-item">
                <button data-secao="${chave}">
                    <span class="icone-categoria">${icone}</span>
                    ${nomeExibido.toUpperCase()}
                </button>
            </li>
        `;
    });

    lista.innerHTML = html;

    lista.querySelectorAll(".categoria-item button").forEach(botao => {
        botao.addEventListener("click", () => {
            const secao = document.getElementById(botao.dataset.secao);
            if(secao) secao.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function montarSecoesDeProdutos(){
    const container = document.getElementById("secoes-produtos");
    if(!container) return;

    let html = "";

    Object.keys(PRODUTOS).forEach(chave => {
        const categoria = PRODUTOS[chave];

        html += `<section class="secao-produtos" id="${chave}"><h2>${categoria.titulo}</h2><div class="produtos">`;

        categoria.itens.forEach(item => {
            const precoExibido = item.preco > 0
                ? `R$ ${item.preco.toFixed(2).replace(".", ",")}`
                : "A combinar";

            const imagemHtml = item.imagem
                ? `<img src="${item.imagem}" alt="${item.nome}">`
                : "";

            html += `
                <div class="card" data-nome="${item.nome}" data-preco="${item.preco}">
                    <h3>${item.nome}</h3>
                    <p class="preco">${precoExibido}</p>
                    ${imagemHtml}
                    <button class="botao-adicionar" onclick="adicionarAoCarrinho(this)">Adicionar</button>
                </div>
            `;
        });

        html += `</div></section>`;
    });

    container.innerHTML = html;
}

/* ===========================
   ADICIONAR PRODUTO AO CARRINHO
=========================== */
function adicionarAoCarrinho(botao){
    const card = botao.closest(".card");
    const nome = card.dataset.nome;
    const preco = parseFloat(card.dataset.preco);

    const itemExistente = carrinho.find(item => item.nome === nome);

    if(itemExistente){
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
    piscarBotao(botao);
}

function piscarBotao(botao){
    const textoOriginal = botao.textContent;
    botao.textContent = "Adicionado ✓";
    botao.disabled = true;
    setTimeout(() => {
        botao.textContent = textoOriginal;
        botao.disabled = false;
    }, 700);
}

/* ===========================
   AUMENTAR / DIMINUIR / REMOVER
   (usa o ÍNDICE do item no array, não o nome —
   assim nomes com apóstrofo como "Jack Daniel's"
   nunca quebram o botão)
=========================== */
function alterarQuantidade(indice, delta){
    const item = carrinho[indice];
    if(!item) return;

    item.quantidade += delta;

    if(item.quantidade <= 0){
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}

function removerItem(indice){
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

/* ===========================
   ATUALIZAR INTERFACE DO CARRINHO
=========================== */
function atualizarCarrinho(){
    const lista = document.getElementById("lista-carrinho");
    const contador = document.getElementById("carrinho-contador");
    const totalEl = document.getElementById("carrinho-total");
    const botaoFinalizar = document.getElementById("botao-finalizar");

    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    contador.textContent = totalItens;
    contador.style.display = totalItens > 0 ? "inline-flex" : "none";

    if(carrinho.length === 0){
        lista.innerHTML = `<p class="carrinho-vazio" id="carrinho-vazio">Seu carrinho está vazio.</p>`;
        totalEl.textContent = "R$ 0,00";
        botaoFinalizar.disabled = true;
        return;
    }

    let html = "";
    let total = 0;
    let temItemACombinar = false;

    carrinho.forEach((item, indice) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const precoLinha = item.preco > 0
            ? `R$ ${item.preco.toFixed(2).replace(".", ",")} cada`
            : "preço a confirmar no WhatsApp";

        if(item.preco === 0) temItemACombinar = true;

        html += `
            <div class="item-carrinho">
                <div class="item-carrinho-info">
                    <p class="item-carrinho-nome">${item.nome}</p>
                    <p class="item-carrinho-preco">${precoLinha}</p>
                </div>
                <div class="item-carrinho-controles">
                    <button class="botao-qtd" data-indice="${indice}" data-delta="-1">−</button>
                    <span>${item.quantidade}</span>
                    <button class="botao-qtd" data-indice="${indice}" data-delta="1">+</button>
                </div>
                <button class="item-carrinho-remover" data-indice="${indice}" title="Remover">🗑</button>
            </div>
        `;
    });

    if(temItemACombinar){
        html += `<p class="aviso-a-combinar">⚠️ Itens "a combinar" não entram no total — o valor final será confirmado no WhatsApp.</p>`;
    }

    lista.innerHTML = html;
    totalEl.textContent = "R$ " + total.toFixed(2).replace(".", ",");
    botaoFinalizar.disabled = false;
}

/* ===========================
   ABRIR / FECHAR PAINEL
=========================== */
function abrirCarrinho(){
    document.getElementById("painel-carrinho").classList.add("aberto");
    document.getElementById("overlay-carrinho").classList.add("aberto");
}

function fecharCarrinho(){
    document.getElementById("painel-carrinho").classList.remove("aberto");
    document.getElementById("overlay-carrinho").classList.remove("aberto");
}

/* ===========================
   FINALIZAR PEDIDO -> WHATSAPP
   (item 3: pede confirmação antes de limpar o carrinho)
=========================== */
function finalizarPedido(){
    if(carrinho.length === 0) return;

    let mensagem = "Olá! Quero fazer o seguinte pedido:\n\n";
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        const linhaPreco = item.preco > 0
            ? `R$ ${subtotal.toFixed(2).replace(".", ",")}`
            : "a combinar";
        mensagem += `• ${item.quantidade}x ${item.nome} - ${linhaPreco}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");

    const limpar = confirm("Pedido enviado para o WhatsApp! Deseja limpar o carrinho agora?");
    if(limpar){
        carrinho = [];
        atualizarCarrinho();
        fecharCarrinho();
    }
}

/* ===========================
   BUSCA DE PRODUTOS
=========================== */
function filtrarProdutos(termo){
    const termoLimpo = termo.trim().toLowerCase();
    const cards = document.querySelectorAll(".card");
    const secoes = document.querySelectorAll(".secao-produtos");
    let totalVisivel = 0;

    cards.forEach(card => {
        const nome = card.querySelector("h3").textContent.toLowerCase();
        const corresponde = nome.includes(termoLimpo);
        card.style.display = corresponde ? "" : "none";
        if(corresponde) totalVisivel++;
    });

    // esconde seções que ficaram sem nenhum card visível
    secoes.forEach(secao => {
        const algumVisivel = [...secao.querySelectorAll(".card")].some(c => c.style.display !== "none");
        secao.style.display = (termoLimpo === "" || algumVisivel) ? "" : "none";
    });

    const avisoSemResultado = document.getElementById("busca-sem-resultado");
    avisoSemResultado.hidden = !(termoLimpo !== "" && totalVisivel === 0);
}

/* ===========================
   ITEM 5: CATEGORIA ATIVA NO SCROLL
=========================== */
function configurarObservadorDeSecoes(){
    const secoes = document.querySelectorAll(".secao-produtos");
    const botoesCategoria = document.querySelectorAll(".categoria-item button");

    if(secoes.length === 0 || botoesCategoria.length === 0) return;

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if(entrada.isIntersecting){
                const id = entrada.target.id;
                botoesCategoria.forEach(botao => {
                    botao.classList.toggle("categoria-ativa", botao.dataset.secao === id);
                });
            }
        });
    }, {
        rootMargin: "-15% 0px -55% 0px" // considera "ativa" a seção logo abaixo do header fixo
    });

    secoes.forEach(secao => observador.observe(secao));
}

/* ===========================
   EVENTOS DE INICIALIZAÇÃO
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    montarPagina();

    const campoBusca = document.getElementById("campo-busca");
    if(campoBusca){
        campoBusca.addEventListener("input", (e) => filtrarProdutos(e.target.value));
    }

    // fecha o carrinho com a tecla Esc
    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape") fecharCarrinho();
    });

    // delegação de evento: cliques nos botões +/-/lixeira dentro do carrinho
    const listaCarrinho = document.getElementById("lista-carrinho");
    if(listaCarrinho){
        listaCarrinho.addEventListener("click", (e) => {
            const botaoQtd = e.target.closest(".botao-qtd");
            if(botaoQtd){
                const indice = parseInt(botaoQtd.dataset.indice, 10);
                const delta = parseInt(botaoQtd.dataset.delta, 10);
                alterarQuantidade(indice, delta);
                return;
            }

            const botaoRemover = e.target.closest(".item-carrinho-remover");
            if(botaoRemover){
                const indice = parseInt(botaoRemover.dataset.indice, 10);
                removerItem(indice);
            }
        });
    }

    configurarObservadorDeSecoes();
});