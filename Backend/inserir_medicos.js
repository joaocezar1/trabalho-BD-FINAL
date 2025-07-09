import 'dotenv/config'; // deve ser a primeira linha
import { Pool } from 'pg';

// Aqui você cita seu banco 'hospital'
const pool = new Pool({
  user: process.env.PGUSER,          // seu superusuário
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,      // <<< nome do banco
  password: process.env.PGPASSWORD,
  port: 5432
});
const medicos = [
  {
    crm: '889956/SP',
    nome: 'Dr. José Maria',
    especialidade: 'Cardiologia',
    telefone: '11999999999',
    num_cons: 101,
    corredor_cons: 10,
    cod_computador_cons: 101
  },
  {
    crm: '987654/SP',
    nome: 'Dra. Ana Cordoso',
    especialidade: 'Dermatologia',
    telefone: '11888888888',
    num_cons: 102,
    corredor_cons: 10,
    cod_computador_cons: 102
  },
  {
    crm: '764589/PI',
    nome: 'Dr. Hércules Flu',
    especialidade: 'Ortopedia/Traumatologia',
    telefone: '89888888888',
    num_cons: 25,
    corredor_cons: 2,
    cod_computador_cons: 25
  },
  {
    crm: '879567/CE',
    nome: 'Dra. Rita Santana',
    especialidade: 'Oftalmologista',
    telefone: '85999999999',
    num_cons: 105,
    corredor_cons: 10,
    cod_computador_cons: 105
  }
];



async function inserirMedicos(listaMedicos) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');//.query -> método para usar comandos SQL no banco de dados a partir do node.js
    /*o Begin determina o ínicio da transação, conjunto de comandos que devem ser executados como único bloco
    indivisível*/
    for (const medico of listaMedicos) {
      await client.query(
        `INSERT INTO medico (crm, nome, especialidade, telefone, num_cons, corredor_cons, cod_computador_cons)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          medico.crm,
          medico.nome,
          medico.especialidade,
          medico.telefone,
          medico.num_cons,
          medico.corredor_cons,
          medico.cod_computador_cons
        ]
      );
    }

    await client.query('COMMIT');//confirma transação
    console.log("Médicos inseridos com sucesso!");
  } catch (err) {
    await client.query('ROLLBACK');//confirma cancelamento
    console.error("Erro ao inserir médicos:", err.message);
  } finally {
    client.release();
  }
}

inserirMedicos(medicos);
