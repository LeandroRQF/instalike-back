// Importa as funções para obter todos os posts, criar um novo post e atualizar um post existente do modelo de posts.
// Importa o módulo do Node.js para interagir com o sistema de arquivos.
// Importa a função para gerar descrições de imagens usando o serviço Gemini.
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

// Define uma função assíncrona para listar todos os posts.
// Obtém todos os posts do banco de dados.
// Imprime os posts no console para fins de depuração.
// Envia uma resposta HTTP com status 200 (OK) e os posts em formato JSON.
export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    console.log(posts);
    
    res.status(200).json(posts);
}

// Define uma função assíncrona para criar um novo post.
// Obtém os dados do novo post do corpo da requisição.
// Cria um novo post no banco de dados.
// Envia uma resposta HTTP com status 200 (OK) e o post criado.
// Imprime a mensagem de erro no console.
// Envia uma resposta HTTP com status 500 (Erro interno do servidor).
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

// Define uma função assíncrona para fazer upload de uma imagem e criar um novo post.
// Inicializa a descrição como uma string vazia.
// Define o nome do arquivo da imagem como URL.
// Inicializa o texto alternativo como uma string vazia.
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    // Cria um novo post no banco de dados.
    // Cria um novo nome para o arquivo da imagem.
    // Renomeia o arquivo da imagem para o novo nome.
    // Envia uma resposta HTTP com status 200 (OK) e o post criado.
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Imprime a mensagem de erro no console.
        // Envia uma resposta HTTP com status 500 (Erro interno do servidor).
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

// Define uma função assíncrona para atualizar um novo post.
// Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
// Constrói a URL da imagem com base no ID do post.
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        // Lê o arquivo da imagem e armazena seu conteúdo em um buffer.
        // Chama a função para gerar uma descrição da imagem usando o serviço Gemini. 
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        // Cria um objeto com os dados do post a ser atualizado.
        // Define a URL da imagem.
        // Define a descrição gerada pelo Gemini.
        // Define o texto alternativo da imagem, obtido do corpo da requisição.
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        // Chama a função para atualizar o post no banco de dados.
        // Envia uma resposta HTTP com status 200 (OK) e o post atualizado.
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Imprime a mensagem de erro no console.
        // Envia uma resposta HTTP com status 500 (Erro interno do servidor).
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}