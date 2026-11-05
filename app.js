import express from "express";
import pets from "./pets.js";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (requisicao, resposta) => {
  resposta.send(pets);
});

app.get("/:nome", (requisicao, resposta) => {
  const nomeInformado = requisicao.params.nome.toLowerCase();
  const pet = pets.find((infoPet) => infoPet.nome === nomeInformado);

  if (pet === undefined) {
    resposta.status(404).send("Não existe o Pet informado.");
  }

  resposta.send(pet);
});

app.put("/:nome", (req, res) => {
  const nomeInformado = req.params.nome.toLowerCase();
  const nomeSelecionado = pets.find((pet) => pet.nome === nomeInformado);

  if (!nomeSelecionado) {
    res.status(404).send("Não existe o Pet informado.");
    return;
  }

  const campos = Object.keys(req.body);

  for (let campo of campos) {
    nomeSelecionado[campo] = req.body[campo];
  }
  res.status(200).send(nomeSelecionado);
});

app.post("/", (req, res) => {
  const novoPet = req.body;
  pets.push(novoPet);
  res.status(201).send(novoPet);
});

app.delete("/:nome", (req, res) => {
  const nomeInformado = req.params.nome.toLowerCase();
  const indicePetSelecionado = pets.findIndex(
    (pet) => pet.nome === nomeInformado,
  );

  if (indicePetSelecionado === -1) {
    res.status(404).send("Não existe o Pet informado");
    return;
  }

  const petRemovido = pets.splice(indicePetSelecionado, 1);
  res.status(200).send(petRemovido);
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
