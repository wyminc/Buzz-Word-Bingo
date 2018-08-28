const express = require("express");
const app = express();
const bp = require("body-parser");

const PORT = process.env.PORT || 8888;

const buzzwords = [{ buzzWord: "SUP", points: 10 }, { buzzWord: "FUQ", points: 100 }, { buzzWord: "HI", points: 20 }];

let totalScore = 0;

app.use(bp.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/buzzwords", (req, res) => {
  res.json(buzzwords);
  console.log(totalScore, "WHAT IS MY TOTAL SCORE?");
});

app.post("/buzzwords", (req, res) => {
  console.log("req", req.body);
  if (typeof ((req.body).buzzWord) === "string" && isNaN(typeof ((req.body).points)) !== false && buzzwords.legnth < 5) {
    buzzwords.push(req.body);
    res.send({ "success": true });
  } else {
    res.send({ "success": false });
  }
})

app.put("/buzzwords", (req, res) => {
  let filteredArr = buzzwords.filter(obj => obj.buzzWord === Object.values(req.body)[0])
  if (buzzwords.filter(obj => obj.buzzWord === Object.values(req.body)[0]).length > 0) {
    buzzwords.splice(buzzwords.indexOf(filteredArr[0]), 1, req.body);
    res.send({ "success": true });
  } else {
    res.send({ "success": false });
  }
})

app.delete("/buzzwords", (req, res) => {
  let filteredArr = buzzwords.filter(obj => obj.buzzWord === Object.values(req.body)[0])
  if (buzzwords.filter(obj => obj.buzzWord === Object.values(req.body)[0]).length > 0) {
    buzzwords.splice(buzzwords.indexOf(filteredArr[0]), 1);
    res.send({ "success": true });
  } else {
    res.send({ "success": false });
  }
})

app.post("/reset", (req, res) => {
  buzzwords.splice(0, buzzwords.length);
  totalScore = 0;
  res.send({ "success": true });
})

app.post("/heard", (req, res) => {
  let filteredArr = buzzwords.filter(obj => obj.buzzWord === Object.values(req.body)[0])
  if (buzzwords.filter(obj => obj.buzzWord === Object.values(req.body)[0]).length > 0) {
    totalScore += filteredArr[0].points;
    res.send({ "totalScore": totalScore });
    // res.json({ buzzWord: filteredArr[0].buzzWord });
  } else {
    res.send({ "success": false });
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
