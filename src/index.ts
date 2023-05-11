/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05

  const { Client } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const alunos = [];

const cadastrarAlunos = (quantidade, contador = 0) => {
  if (contador < quantidade) {
    rl.question(`Digite o nome do aluno ${contador + 1}: `, (nome) => {
      alunos.push({ nome });
      cadastrarAlunos(quantidade, contador + 1);
    });
  } else {
    console.log('Alunos cadastrados:');
    alunos.forEach((aluno) => {
      console.log(`- ${aluno.nome}`);
    });
    if (alunos.length > 0) {
      inserirNomesNoBanco(alunos);
    }
    rl.close();
  }
};

const inserirNomesNoBanco = async (alunos) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
  });

  try {
    await client.connect();

    // Criação da tabela 'alunos' se ela não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS alunos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL
      )
    `);

    for (const aluno of alunos) {
      const query = 'INSERT INTO alunos (nome) VALUES ($1)';
      const values = [aluno.nome];

      await client.query(query, values);
    }

    console.log('Nomes dos alunos inseridos no banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir os nomes dos alunos no banco de dados:', error);
  } finally {
    await client.end();
  }
};

rl.question('Quantos alunos deseja inserir? ', (quantidade) => {
  const quantidadeNumber = Number(quantidade);
  if (isNaN(quantidadeNumber)) {
    console.log('Quantidade inválida, tente novamente!');
    rl.close();
  } else {
    console.log(`A quantidade digitada foi: ${quantidadeNumber}`);
    cadastrarAlunos(quantidadeNumber);
  }
});

	
});
