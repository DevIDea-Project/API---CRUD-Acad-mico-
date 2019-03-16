const restify = require('restify'); // Faço a requisição do framework restify.
const errs = require('restify-errors'); // Faço a requisiçao do modulo de erros.

/* Poderia ter criado um servidor desta forma, porém daria mais trabalho em 
 definir as rotas manualmente, sem falar que se tivessemos centenas de rotas
=>  const http = require('http'); Por isso optamos por criar a rota com o Framework Restify*/

// Criando o servidor restify e passando os paramentros.
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

/** Usei o framework para conectar ao banco de dados.*/
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'projetoDB'
  }
});
server.use(restify.plugins.acceptParser(server.acceptable)); // para o servidor.
server.use(restify.plugins.queryParser()); // query para o banco de Dados.
server.use(restify.plugins.bodyParser()); // Para a pagina HTML

// Passando a porta que ele vai escutar, porta 8080. Depois uma função passando o NOME do servidor e a Url
server.listen(8080,  () => {
  console.log('%s listening at %s', server.name, server.url);
});




// Daqui pra baixo são criando as rotas de Acesso.

server.get('/', restify.plugins.serveStatic({
   
     directory: './dist',
     
     file: 'index.html'

}));

//Function para Select.
server.get('/read',  (req, res, next) => {
  
  knex('funcionario').then((dados) => {
    res.send(dados);
  
  }, next);
});

// Insert (inserir um dado novo na tabela).
server.post('/create',  (req, res, next) => {
 
  knex('funcionario')
    
    .insert(req.body)
    
    .then((dados) => {
    
      res.send(dados);
  
  }, next);

});

// Consultar pelo ID.
server.get('/show/:id',  (req, res, next) => {
  
  const { id } = req.params;
  
  knex('funcionario')
    
    .where('id', id)
    
    .first()
    
    .then((dados) => {

      if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado!'));
    
      res.send(dados);
  
  }, next);
});

// Fazer Update pelo ID
server.put('/update/:id',  (req, res, next) => {
  
  const { id } = req.params;
  
  knex('funcionario')
    
    .where('id', id)
    
    .update(req.body)
    
    .then((dados) => {

      if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado!'));
    
      res.send('Dados atualizados!');
  
  }, next)
});

//Delete Pelo ID.
server.del('/delete/:id', (req, res, next) => {

  const { id } = req.params;
  
  knex('funcionario')
    
    .where('id', id)
    
    .delete()
    
    .then((dados) => {

      if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado!'));
    
      res.send('Dados deletado!');
  
  }, next);
});