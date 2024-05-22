// IMPORTAÇÕES
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var expressLayouts = require('express-ejs-layouts');
var cors = require('cors');
var path = require('path');
var port = 8000;

var app = express();
app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROTAS
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/informacoes', (req, res) => {
    fs.readFile('public/informacoes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar os dados dos discos');
        }
        const produtos = JSON.parse(data);
        res.render('informacoes', { produtos });
    });
});

app.get('/ouvir', (req, res) => {
    res.render('ouvir');
});

// START SERVIDOR
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});