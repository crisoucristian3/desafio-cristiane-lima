class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: 'Café', valor: 3.00 },
      chantily: { descricao: 'Chantily', valor: 1.50 },
      suco: { descricao: 'Suco Natural', valor: 6.20 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
      queijo: { descricao: 'Queijo', valor: 2.00 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };
    this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasDePagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');

      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      const item = this.cardapio[codigo];
      const valorItem = item.valor * quantidade;

      if (codigo !== 'chantily' && codigo !== 'queijo') {
        total += valorItem;
      } else {
        if (!itens.includes(`${codigo.replace('extra', '')},1`)) {
          return "Item extra não pode ser pedido sem o principal";
        }
        total += valorItem;
      }
    }

    if (formaDePagamento === 'dinheiro') {
      total *= 0.95; // Aplicando desconto de 5% em dinheiro
    } else if (formaDePagamento === 'credito') {
      total *= 1.03; // Acréscimo de 3% no pagamento com crédito
    }

    return `R$ ${total.toFixed(2)}`;
  }
}

const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('debito', ['cafe,1']));