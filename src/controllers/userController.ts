import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const createUser = (req: Request, res: Response): void => {

  const { user, erros } = req.body;
  const result = userService.createUser(user);

  if (erros.length > 0) {
    res.status(400).json({ erros });
    return;
  }

  res.status(201).json("Usuário criado com sucesso");
}

export const getAllUsers = (req: Request, res: Response): void => {
  
  const { users } = req.body;
  if (!users) {
    res.status(400).json("Nenhum usuário encontrado");
    return;
  }
  const result = userService.findAllUsers();
  res.status(200).json(result);
} 

export const getUserById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const result = userService.findUserById(id);

  if (!result) {
    res.status(404).json("Usuário não encontrado");
    return;
  }

  res.status(200).json(result);
} 