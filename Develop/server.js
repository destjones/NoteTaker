const fs = require("fs");
const path = require("path");
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static((__dirname, "public")));


fs.readFile("db/db.json","utf8", (err, data) => {

  if (err) throw err;

  const note = JSON.parse(data);

app.get('/notes', function(req,res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "db/db.json", 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    console.log("These are notes", data)
    res.json(JSON.parse(data))
  })
});
app.post("/api/notes", function(req, res) {
  let noteCreate = req.body;
  note.push(noteCreate);
  updateNotes();
  return console.log("New note added: "+ noteCreate.title);
});

app.delete("/api/notes/:id", function(req, res) {
  note.splice(req.params.id, 1);
  updateNotes();
  console.log("Deleted note: "+ req.params.id);
});
app.get("/api/notes/:id", function(req,res) {
  res.json(note[req.params.id]);
});

function updateNotes() {
  fs.writeFile("db/db.json",JSON.stringify(note,'\t'),err => {
      if (err) throw err;
      return true;
  });
};
});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));