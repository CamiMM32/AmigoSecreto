let amigos = [];

function adicionarAmigo() {
    // Corrigido: ID do input é 'amigo' no HTML
    const amigoInput = document.getElementById('amigo');
    const nomeAmigo = amigoInput.value.trim();

    if (nomeAmigo === '') {
        alert('Por favor, insira um nome válido.');
        amigoInput.focus();
        return;
    }

    // Melhoria: Converter para minúsculas para evitar duplicados como "Ana" e "ana"
    if (amigos.map(a => a.toLowerCase()).includes(nomeAmigo.toLowerCase())) {
        alert('Este nome já está na lista. Por favor, insira um nome diferente.');
        amigoInput.value = '';
        amigoInput.focus();
        return;
    }

    amigos.push(nomeAmigo);
    atualizarLista(); // Corrigido: Nome da função
    amigoInput.value = '';
    amigoInput.focus();
}

function sortearAmigo() { // Corrigido: Nome da função para corresponder ao HTML
    if (amigos.length < 4) { // Um sorteio de amigo secreto precisa de pelo menos 4 pessoas para garantir que não haja problemas.
        alert('É necessário pelo menos 4 amigos para realizar o sorteio.');
        return;
    }

    embaralhar(amigos);
    const resultado = document.getElementById('resultado'); // Corrigido: ID do elemento de resultado
    resultado.innerHTML = ''; // Limpa o resultado anterior

    for (let i = 0; i < amigos.length; i++) {
        // O último amigo da lista tira o primeiro para fechar o ciclo.
        const amigoSorteado = (i == amigos.length - 1) ? amigos[0] : amigos[i + 1];
        
        const itemLista = document.createElement('li');
        itemLista.textContent = `${amigos[i]} --> ${amigoSorteado}`;
        resultado.appendChild(itemLista);
    }
}

// Algoritmo de Fisher-Yates para embaralhar a lista
function embaralhar(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        // Atribuição via desestruturação
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos'); // Corrigido: ID da lista de amigos
    lista.innerHTML = ''; // Limpa a lista antes de atualizar

    // Melhoria: Cria um <li> para cada amigo, o que é semanticamente correto
    amigos.forEach(amigo => {
        const itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        lista.appendChild(itemLista);
    });
}

function reiniciar() {
    amigos = [];
    // Corrigido: IDs dos elementos
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    const amigoInput = document.getElementById('amigo');
    amigoInput.value = '';
    amigoInput.focus();
}
