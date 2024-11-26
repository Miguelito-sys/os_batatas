// Função para armazenar e gerenciar o carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Adicionar produtos ao carrinho
function adicionarAoCarrinho(produtoId, nomeProduto, preco) {
    const produtoExistente = carrinho.find(p => p.id === produtoId);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ id: produtoId, nome: nomeProduto, preco: preco, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Atualizar a exibição do carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('listaCarrinho');
    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.textContent = 'Seu carrinho está vazio.';
        document.getElementById('finalizarCompra').disabled = true;
        return;
    }

    carrinho.forEach(produto => {
        const item = document.createElement('div');
        item.textContent = `${produto.nome} - R$${produto.preco} x ${produto.quantidade}`;
        listaCarrinho.appendChild(item);
    });

    const total = carrinho.reduce((acc, prod) => acc + prod.preco * prod.quantidade, 0);
    document.getElementById('totalCarrinho').textContent = `Total: R$ ${total}`;
    document.getElementById('finalizarCompra').disabled = false;
}

// Evento de clique para adicionar produtos
document.querySelectorAll('.adicionar-carrinho').forEach(button => {
    button.addEventListener('click', (event) => {
        const produtoDiv = event.target.closest('.produto');
        const id = produtoDiv.getAttribute('data-id');
        const nome = produtoDiv.querySelector('h3').textContent;
        const preco = parseFloat(produtoDiv.querySelector('p:nth-of-type(2)').textContent.replace('Preço: R$', '').trim());
        adicionarAoCarrinho(id, nome, preco);
    });
});
// Inicialização
atualizarCarrinho();
