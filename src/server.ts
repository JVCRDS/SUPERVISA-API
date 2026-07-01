import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
})

const PORT = 3000; 

app.listen(PORT, () => {
  console.log(`Servidor esta rodando em: http://localhost:${PORT}`);
  console.log('Rota teste: http://localhost:3000/ping');
});


