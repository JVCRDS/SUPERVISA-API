export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  endereco: string;
  cep: string;
}

export interface Denuncia {
  id: string;
  userId: string;
  descricao: string;
  data: string; 
  status: "pending" | "process" | "solved" | "archived";
}
