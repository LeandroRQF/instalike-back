// **Importa as dependências necessárias:**
// - express: Framework web para Node.js, usado para criar o servidor.
import express from "express";

// **Cria uma instância do Express:**
// - Inicia o aplicativo Express.
const app = express();

// **Inicia o servidor na porta 3000:**
// - Escuta por requisições na porta 3000 e exibe uma mensagem no console.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Define uma rota GET para o caminho '/geral'.
  // Quando uma requisição GET for feita para este endpoint, a função de callback será executada.
  // A função de callback recebe dois parâmetros:
  // - req: Objeto que representa a requisição do cliente.
  // - res: Objeto que representa a resposta que será enviada ao cliente.

  // Envia uma resposta com status 200 (sucesso) e o corpo da resposta como "Rota inicial!".
app.get("/geral", (req, res) => {
    res.status(200).send("Rota inicial!");
});
