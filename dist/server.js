const restify = require('restify');
const errs   = require('errors');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
})

const knex = requere('knex')({
    client: 'mysql',
    connection: {
        host:'',
        user: '',
        password:'',
        database:'',
    }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser()); 
server.use(restify.plugins.bodyParser());

server.listen(8080, function(){
  console.log('%s listening att%s', server.name , server.url);s
});
