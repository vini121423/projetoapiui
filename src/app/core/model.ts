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

export class Categoria{
     id: number;
     nome: string;
}

export class Produto{
    id: number;
    nome:string;
    preco:number;
    categoria = new Categoria();
}