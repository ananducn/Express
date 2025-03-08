import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const port = process.env.PORT || 3000
import logger from "./logger.js";
import morgan from "morgan";

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

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let ninjaData = [];
let nextId = 1;

// Add a new ninja data
app.post("/leafNinja", (req, res) => {
  const { name, clan } = req.body;
  const newNinja = { id: nextId++, name, clan };
  ninjaData.push(newNinja);
  res.status(201).send(newNinja);
});

// to get data on all ninjas
app.get("/leafNinja", (req, res) => {
  res.status(200).send(ninjaData);
});

// to get data of a particular ninja using id
app.get("/leafNinja/:id", (req, res) => {
  const ninja = ninjaData.find((n) => n.id === parseInt(req.params.id));
  if (!ninja) {
    return res.status(404).send("Ninja not found");
  }
  res.status(200).send(ninja);
});

// update a ninja data

app.put("/leafNinja/:id", (req, res) => {
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

app.delete("/leafNinja/:id", (req, res) => {
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
