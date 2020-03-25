const express = require('express');
// const routes = require('./src/routes');

const app = express();

// app.use(express.json);
// app.use(routes);

app.get('/', (request, response) => {
    return response.json({
        aluno:"Tiago"
    });
});


app.listen(3333);