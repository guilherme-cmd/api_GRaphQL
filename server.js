const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { readFileSync } = require('fs');
const cors = require('cors'); 

const resolvers = require('./resolvers'); // Certifique-se de usar o caminho correto para o arquivo de resolvers

// Leia o conteúdo do arquivo schema.graphql
const schemaString = readFileSync('./schema.graphql', 'utf-8');

const typeDefs = schemaString;

const server = new ApolloServer({
  typeDefs,
  resolvers, // Agora você importou os resolvers
});

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () =>
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
);

