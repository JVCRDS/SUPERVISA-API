import { User } from '../types/index';

let users: User[] = [];

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const validarDadosUser = (
  dados: Partial<User>,
  checarExistencia: boolean = false
): string[] => {
  const erros: string[] = [];

  if (!dados.nome && checarExistencia) erros.push('O campo "nome" é obrigatório.');
  if (!dados.email && checarExistencia) erros.push('O campo "email" é obrigatório.');
  if (!dados.cpf && checarExistencia) erros.push('O campo "cpf" é obrigatório.');
  if (!dados.senha && checarExistencia) erros.push('O campo "senha" é obrigatório.');
  if (!dados.endereco && checarExistencia) erros.push('O campo "endereco" é obrigatório.');
  if (!dados.cep && checarExistencia) erros.push('O campo "cep" é obrigatório.');
  

  if (dados.email && !dados.email.includes('@')) {
    erros.push('Email inválido');
  }

  if (dados.cpf && !/^\d{11}$/.test(dados.cpf)) {
    erros.push('CPF inválido. Deve conter 11 dígitos numéricos.');
  }

  if (dados.email) {
    const emailExiste = users.some(user => user.email === dados.email);
    if (emailExiste) erros.push('Email já cadastrado.');
  }
  if (dados.cpf) {
    const cpfExiste = users.some(user => user.cpf === dados.cpf);
    if (cpfExiste) erros.push('CPF já cadastrado.');
  }
  

  return erros;
};

export const createUser = (dados: Omit<User, 'id'>): { user: User; erros: string[] } => {
  
  const erros = validarDadosUser(dados, true);
  if (erros.length > 0) {
    return { user: null as any, erros };
  }

  const novoUser: User = {
    id: generateId(),
    ...dados
  };

  users.push(novoUser);
  
  return { user: novoUser, erros: [] };
};

export const findAllUsers = (): User[] => {
  return users;
};

export const findUserById = (id: string): User | null => {
  return users.find((user) => user.id === id) || null;
};


export const updateUser = (
  id: string,
  dados: Partial<Omit<User, "id">>,
): { user: User | null; erros: string[] } => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return { user: null, erros: ["Usuário não encontrado"] };
  }

  
  const erros = validarDadosUser(dados, false);
  if (erros.length > 0) {
    return { user: null, erros };
  }

  
  const userAtual = users[index];
  const userAtualizado: User = {
    ...userAtual,
    ...dados,
  };

  users[index] = userAtualizado;
  return { user: userAtualizado, erros: [] };
};


export const deleteUser = (
  id: string,
): { success: boolean; mensagem: string } => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return { success: false, mensagem: "Usuário não encontrado" };
  }

  users.splice(index, 1);
  return { success: true, mensagem: "Usuário removido com sucesso" };
};
