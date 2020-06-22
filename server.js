const express = require('express');
const bodyParser = require('body-parser');

//imports bd
const connection = require('./database/database');
const Asks = require('./database/models/asks');
const Answer = require('./database/models/answer');
const AnswerModel = require('./database/models/answer');

//inicializando app
const app = express();

//database
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão Realizada')
    })
    .catch((msgError) => {
        console.log(msgError);
    });

//setando ejs como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//configurando o body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*---------------------- ROTAS ------------------------ */

//home
app.get('/', (req, res)=>{
    
    Asks.findAll({raw:true})
        .then( (askList) => {
            res.render('index', {
                asks: askList
            });
        });

});

//realizar pergunta
app.get('/ask', (req, res)=>{
    res.render('ask');
});

//exibir uma pergunta
app.get('/ask/:id', (req, resp) => {
    const idAsk = req.params.id;
    
    Asks.findAll({
        raw: true,
        where: {
            id: idAsk
        }
    }).then((item)=> {
        if(item != undefined){
            AnswerModel.findAll({
                raw:true,
                where: {
                    idAsk: idAsk
                }
            }).then ((answers) => {
                console.log(item);
                console.log(answers);
                resp.render('answer', {
                    ask: item,
                    answers: answers
                });
            });
        }
        
    });
    
});

//gravar uma pergunta no bd
app.post('/ask', (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    Asks.create({
        title: title,
        description: description
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(() => {
        res.send('Error');
    });

});

//responder pergunta
app.post('/answer/:idAsk', (req, res) => {
    const idAsk = req.params.idAsk;
    const contentAnswer = req.body.answer;
    AnswerModel.create({
        idAsk: idAsk,
        description: contentAnswer
    }).then(() => {
        res.redirect('/ask/'+idAsk);
    });
 
})


app.listen(3030, (error) => {
    if(error){
        console.log('Falha : ' + error);
    } else {
        console.log('Rodando ...');
    }
});