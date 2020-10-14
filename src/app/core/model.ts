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
	itens = new Array<ItemPedido>();
}

export class Itempedido {
    id: number;
    produto = new Produto();
    qtdeitem: number;
    valorunitario: number;
    totalitem: number;
	
	constructor(
	id?: number,
	produto?: Produto,
	qtdeitem?: number,
	valorunitario?:number,
	totalitem?:number) {
		
		this.id = id;
		this.produto = produto;
		this.qtdeitem = qtdeitem;
		this.valorunitario = valorunitario;
		this.totalitem = totalitem;
		
	}
}