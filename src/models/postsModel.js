import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
// Seleciona o banco de dados "instalike-back".
// Seleciona a coleção "posts" dentro do banco de dados.
// Retorna um array com todos os documentos da coleção.
export async function getTodosPosts() {    
    const db = conexao.db("instalike-back");    
    const colecao = db.collection("posts");
    
    return colecao.find().toArray();
}

// Função assíncrona para criar posts do banco de dados.
// Seleciona o banco de dados 'instalike-back'.
// Seleciona a coleção 'posts' dentro do banco de dados.
// Insere um novo documento (o novo post) na coleção 'posts' e retorna o resultado da operação.
export async function criarPost(novoPost) {
    const db = conexao.db("instalike-back");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar posts do banco de dados.
// Seleciona o banco de dados 'instalike-back'.
// Seleciona a coleção 'posts' dentro do banco de dados.
// Converte o ID do post (em formato hexadecimal) para um objeto ObjectId do MongoDB.
// Atualiza o documento com o ID correspondente ao objID, substituindo os campos existentes pelos valores do objeto novoPost.
export async function atualizarPost(id, novoPost) {
    const db = conexao.db("instalike-back");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}