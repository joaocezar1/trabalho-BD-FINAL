import express from 'express';
import cors from 'cors'; 
import { inserir } from './popular_bd.js';

const app = express();
app.use(express.json());
app.use(cors()); 

app.post('/inserir', async (req, res) => {
  const medicos = req.body.medicos;

  try {
    await inserir(medicos, 'medico');
    res.status(201).send('Inserção feita com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao inserir: ' + err.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor Node rodando em http://localhost:3000');
});