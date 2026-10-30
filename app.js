import express from "express";
import pets from "./pets.js";

const app = express();
const port = 3000;

app.get("/", (requisicao, resposta) => {
  resposta.send(pets);
});

app.get("/:nome", (requisicao, resposta) => {
  const nomeInformado = requisicao.params.nome;
  const pet = pets.find((infoPet) => infoPet.nome === nomeInformado);

  resposta.send(pet);
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
