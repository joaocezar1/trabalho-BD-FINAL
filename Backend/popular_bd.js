import pool from './conexaoBd.js'


const prescricoes = [
  {
    dataCons:"2025-04-01",
    horario:"18:01",
    paciente_codigo:3,
    medico_codigo:2,
    medicamento_codigo:"3"
  },
  {
    dataCons:"2025-05-11",
    horario:"12:07",
    paciente_codigo:4,
    medico_codigo:3,
    medicamento_codigo:"2"
  },
  {
    dataCons:"2025-01-26",
    horario:"07:45",
    paciente_codigo:5,
    medico_codigo:2,
    medicamento_codigo:"1"
  }
];
async function inserir(lista, nomeTabela) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');//.query -> método para usar comandos SQL no banco de dados a partir do node.js
    /*o Begin determina o ínicio da transação, conjunto de comandos que devem ser executados como único bloco
    indivisível*/
    let colunas,valores,string1, string2;
    for (const linha of lista) {
        colunas = Object.keys(linha);
        valores = Object.values(linha);
        string1 = `INSERT INTO ${nomeTabela} (`
        string2 = 'VALUES ($'
        
        let index = 0;
        for (let coluna of colunas){
            string1 = string1 + `${coluna} ,`
            index++;
            string2 = string2 + index + ", $"
        }
        string1 = string1.slice(0, -2);
        string1 = string1 + ")";
        string2 = string2.slice(0, -3);
        string2 = string2 + ")";
        var queryString = string1+string2;

      await client.query(
        queryString, valores
      );
    }
    await client.query('COMMIT');//confirma transação
    console.log("A inserção foi um sucesso!");
  } catch (err) {
    await client.query('ROLLBACK');//confirma cancelamento
    console.error("Erro ao inserir:", err.message);
  } finally {
    client.release();
  }
}
inserir(prescricoes, "prescricao");
