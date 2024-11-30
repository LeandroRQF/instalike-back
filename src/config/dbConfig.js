// Importa a classe MongoClient do módulo MongoDB. 
// Essa classe é fundamental para estabelecer a conexão com o banco de dados.
import { MongoClient } from 'mongodb';

// Define uma função assíncrona chamada conectarAoBanco que recebe a string de conexão como parâmetro. 
// A palavra-chave 'export default' torna essa função disponível para ser importada em outros módulos.
export default async function conectarAoBanco(STRING_CONEXAO) {

  //Declara uma variável para armazenar a instância do cliente MongoDB.
  let mongoClient;

  try {
      // Cria uma nova instância do cliente MongoDB, utilizando a string de conexão fornecida como parâmetro. Essa string contém informações como o endereço do banco de dados, nome do banco de dados e credenciais de acesso.
      // Imprime uma mensagem no console indicando que a conexão com o banco de dados está sendo estabelecida.
      // Tenta estabelecer a conexão com o banco de dados. A palavra-chave 'await' faz com que a execução da função pause até que a conexão seja estabelecida ou ocorra um erro.
      // Imprime uma mensagem no console indicando que a conexão foi estabelecida com sucesso.
      mongoClient = new MongoClient(STRING_CONEXAO);
      console.log('Conectando ao cluster do banco de dados...');
      await mongoClient.connect();
      console.log('Conectado ao MongoDB Atlas com sucesso!');

      // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código para realizar operações no banco de dados.
      return mongoClient;
  } catch (erro) {
      // Bloco de código que será executado caso ocorra algum erro dentro do bloco try.
      // Imprime uma mensagem de erro no console, junto com o objeto de erro para mais detalhes.
      // Encerra a aplicação em caso de falha na conexão.
      console.error('Falha na conexão com o banco!', erro);
      process.exit();
  }
}