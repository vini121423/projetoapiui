export class Cidade {
    id: number;
    nome: string;
    estado: string;
}

export class Cliente {
    id: number;
    nome: string;
    telefone: string;
    cidade = new Cidade();
}

export class Categoria {
    id: number;
    nome: string;
}

export class Produto {
    id: number;
    nome: string;
    preco: number;
    categoria = new Categoria();
}


export class Pedido {
    id: number;
    datapedido: Date;
    cliente = new Cliente();
    valorpedido: number;
}

export class Itempedido {
    id: number;
    produto = new Produto();
    cliente = new Cliente();
    qtdeitem: number;
    valorunitario: number;
    totalitem: number;
}