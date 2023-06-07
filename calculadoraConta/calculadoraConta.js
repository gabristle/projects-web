class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
    this.pessoasConsumidoras = [];
  }

  adicionarConsumidor(pessoa) {
    this.pessoasConsumidoras.push(pessoa);
  }
}

class Pessoa {
  constructor(nome) {
    this.nome = nome;
    this.produtosConsumidos = [];
    this.precoAPagar = {};
  }

  adicionarProdutoConsumido(produto) {
    this.produtosConsumidos.push(produto);
    produto.adicionarConsumidor(this);
  }
}

const produtos = [];
const pessoas = [];

function cadastrarProduto() {
  const produtoInput = document.getElementById("nomeProduto");
  const nomeProduto = produtoInput.value;
  const precoInput = document.getElementById("precoProduto");
  const preco = precoInput.value;

  const produto = new Produto(nomeProduto, preco);
  produtos.push(produto);

  listaTabela(produto);
  criarCheckboxProduto(produto);

  produtoInput.value = "";
  precoInput.value = "";
}

function criarCheckboxProduto(produto) {
  const opcoesProdutos = document.getElementById("listarProdutos");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = produto.nome;

  opcoesProdutos.appendChild(checkbox);

  const label = document.createElement("label");
  label.innerHTML = produto.nome;

  opcoesProdutos.appendChild(label);

  const br = document.createElement("br");
  opcoesProdutos.appendChild(br);
}

function cadastrarPessoa() {
  const pessoaInput = document.getElementById("nomePessoa");
  const nomePessoa = pessoaInput.value;

  const pessoa = new Pessoa(nomePessoa);

  const checkboxes = document.querySelectorAll(
    "#listarProdutos input[type=checkbox]"
  );

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      const nomeProduto = checkbox.value;
      const produto = produtos.find(function (produto) {
        return produto.nome === nomeProduto;
      });
      pessoa.adicionarProdutoConsumido(produto);
      checkbox.checked = false;
    }
  });

  pessoas.push(pessoa);

  pessoaInput.value = "";

  console.log(pessoas);
}

function listaTabela() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < produtos.length; i++) {
    let tr = tbody.insertRow();

    let tdNome = tr.insertCell();
    let tdPreco = tr.insertCell();

    tdNome.innerText = produtos[i].nome;
    tdPreco.innerText = produtos[i].preco;
  }
}

function calcular() {
  const informacoesPagamento = document.getElementById("listarResultados");
  informacoesPagamento.innerHTML = "";
  for (let i = 0; i < produtos.length; i++) {
    novoPreco = produtos[i].preco / produtos[i].pessoasConsumidoras.length;
    produtos[i].preco = novoPreco;
  }

  for (let i = 0; i < pessoas.length; i++) {
    let precoAPagar = 0;
    for (let j = 0; j < pessoas[i].produtosConsumidos.length; j++) {
      precoAPagar += pessoas[i].produtosConsumidos[j].preco;
    }
    if (document.getElementById("taxa").checked) {
      pessoas[i].precoAPagar *= 1.1;
    }

    pessoas[i].precoAPagar = precoAPagar;
    const paragrafo = document.createElement("p");
    paragrafo.innerText = `${pessoas[i].nome} pagará R$ ${pessoas[i].precoAPagar.toFixed(2)}`;
    informacoesPagamento.appendChild(paragrafo);
  }


  produtoInput.value = "";
  precoInput.value = "";
  pessoaInput.value = "";

  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
}

