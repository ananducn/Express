import "dotenv/config";

import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello anime fans!");
// });
// app.get("/itachi", (req, res) => {
//   res.send("You are under my genjutsu - itachi uchiha");
// });
// app.get("/naruto", (req, res) => {
//   res.send("i will be the hokage, dattabayo.");
// });

app.use(express.json());

let ninjaData = [];
let nextId = 1;

// Add a new ninja data
app.post("/leaf", (req, res) => {
  const { name, clan } = req.body;
  const newNinja = { id: nextId++, name, clan };
  ninjaData.push(newNinja);
  res.status(201).send(newNinja);
});

// to get data on all ninjas
app.get("/leaf", (req, res) => {
  res.status(200).send(ninjaData);
});

// to get data of a particular ninja using id
app.get("/leaf/:id", (req, res) => {
  const ninja = ninjaData.find((n) => n.id === parseInt(req.params.id));
  if (!ninja) {
    return res.status(404).send("Ninja not found");
  }
  res.status(200).send(ninja);
});

// update a ninja data

app.put("/leaf/:id", (req, res) => {
  const ninja = ninjaData.find((n) => n.id === parseInt(req.params.id));
  if (!ninja) {
    return res.status(404).send("Ninja not found");
  }
  const { name, clan } = req.body;
  ninja.name = name;
  ninja.clan = clan;
  res.status(200).send(ninja);
});

// delete a ninja data

app.delete("/leaf/:id", (req, res) => {
  const index = ninjaData.findIndex((n) => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Ninja not found");
  }
  ninjaData.splice(index, 1);
  return res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
