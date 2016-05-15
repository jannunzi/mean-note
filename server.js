var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meannote');

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/note", findAllNotes);
app.delete("/api/note/:id", removeNote);
app.post("/api/note", addNote);

var NoteSchema = mongoose.Schema({
    title: String,
    body: String
}, {collection: "notes"});

var NoteModel = mongoose.model("NoteModel", NoteSchema);

var notes = [
    {title:"Note 1", body: "Body 1"},
    {title:"Note 2", body: "Body 2"},
    {title:"Note 3", body: "Body 3"},
    {title:"Note 4", body: "Body 4"},
    {title:"Note 5", body: "Body 5"}
];

function addNote(req, res) {
    var note = req.body;
    // notes.push(note);
    // res.json(notes);
    NoteModel
        .create(note)
        .then(function(newNote){
            findAllNotes(req, res);
        });
}

function removeNote(req, res) {
    var id = req.params.id;
    // notes.splice(index, 1);
    // res.json(notes);
    NoteModel
        .remove({_id: id})
        .then(function(status){
            findAllNotes(req, res);
        });
}

function findAllNotes(req, res) {
    // res.json(notes);
    NoteModel
        .find()
        .then(function(notes) {
            res.json(notes);
        });
}

app.listen(3000);
