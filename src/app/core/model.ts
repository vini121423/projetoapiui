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