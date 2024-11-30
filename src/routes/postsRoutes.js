// Importa o framework Express para criar a aplicação web.
// Importa o middleware Multer, que é usado para lidar com o upload de arquivos (como imagens) em aplicações Express.js. 
// Importa várias funções do arquivo postsController.js (lista todos os posts, cria um novo post, trabalha com upload de imagens e atualiza ump post.
import express from "express"; 
import multer from "multer"; 
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; 
import cors from "cors";

// Importa o middleware CORS (Cross-Origin Resource Sharing), que permite que aplicações web em diferentes domínios se comuniquem entre si.
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens.
// Especifica o diretório para armazenar as imagens enviadas.
// Substitua por seu caminho de upload desejado
const storage = multer.diskStorage({
  destination: function (req, file, cb) {    
    cb(null, 'uploads/'); 
  },

  // Mantém o nome original do arquivo por simplicidade.
  // Considere usar uma estratégia de geração de nomes únicos para produção.
  filename: function (req, file, cb) {    
    cb(null, file.originalname); 
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });

// Define as rotas usando o objeto Express app.
const routes = (app) => {
  // Permite que o servidor interprete corpos de requisições no formato JSON.
  app.use(express.json());

  //Essa linha de código configura o Express para entender e processar dados enviados no formato JSON nas requisições HTTP.
  app.use(cors(corsOptions))

  // Rota para recuperar uma lista de todos os posts
  app.get("/posts", listarPosts); // Chama a função controladora apropriada

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost); // Chama a função controladora para criação de posts

  // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
  app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem`

  // Define uma rota PUT para o caminho /upload/:id.
  // O :id é um parâmetro de rota que será utilizado para identificar o recurso a ser atualizado.
  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;