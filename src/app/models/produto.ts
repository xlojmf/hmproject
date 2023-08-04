export interface Produto {
    id: number;
    nome: string;
    marca: string;
    tipo_de_produto: string;
    cor: string;
    preco: number;
    descricao: string;
    foto_principal: string;
    foto_secundaria: string;
    featured: boolean;
    isFavorite: boolean;
}
