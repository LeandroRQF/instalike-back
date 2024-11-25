
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imagemBuffer) {
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    const imagem = {
      inlineData: {
        data: imagemBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, imagem]);
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
