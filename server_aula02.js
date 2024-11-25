// **Importa as dependências necessárias:**
// - express: Framework web para Node.js, usado para criar o servidor.
import express from "express";

// **Array de posts simulados:**
// - Cria um array de objetos, cada objeto representando um post com as propriedades:
//   - id: Identificador único do post.
//   - descricao: Descrição do post.
//   - imgUrl: URL da imagem do post.
// Este array é usado para simular dados enquanto a conexão com o banco de dados não está configurada.
const posts = [
    {
        id: 1,
        descricao: "Gato",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,        
        descricao: "Gato curioso",
        imagem: "https://placekitten.com/400/200"
    },
    {
        id: 3,
        descricao: "Paisagem montanhosa",
        imagem: "https://source.unsplash.com/random/300x200/?mountains"
    },
    {
        id: 4,
        descricao: "Cachorro brincando",
       imagem: "https://source.unsplash.com/random/300x200/?dog,play"
    },
    {
        id: 5,
        descricao: "Comida deliciosa",
        imagem: "https://source.unsplash.com/random/300x200/?food"
    },
    {
        id: 6,
        descricao: "Cidade à noite",
        imagem: "https://source.unsplash.com/random/300x200/?city,night"
    }
  ];      

// **Cria uma instância do Express:**
// - Inicia o aplicativo Express.
const app = express();

// **Middleware para analisar JSON no corpo das requisições:**
// - Permite que o Express entenda dados enviados no formato JSON.
app.use(express.json());

// **Inicia o servidor na porta 3000:**
// - Escuta por requisições na porta 3000 e exibe uma mensagem no console.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// **Rota GET para buscar todos os posts:**
// - Quando uma requisição GET é feita para a rota '/posts', esta função é executada.
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

// **Função para buscar um post por ID no array simulado:**
// - Procura o índice do objeto com o ID correspondente no array 'posts'.
// - Retorna o índice encontrado.
function buscarPostsPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

// **Rota GET para buscar um post por ID:**
// - Quando uma requisição GET é feita para a rota '/posts/:id', esta função é executada.
// - Extrai o ID da URL usando req.params.id.
// - Chama a função buscarPostsPorId() para encontrar o post.
// - Envia o post encontrado como resposta em formato JSON.
app.get("/posts/:id", (req, res) => {
    const index = buscarPostsPorId(req.params.id)
    res.status(200).json(posts[index]);
});