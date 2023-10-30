const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');

// Leia o conteúdo do arquivo schema.graphql
const schemaString = fs.readFileSync('./schema.graphql', 'utf-8');

const typeDefs = gql(schemaString);


const users = [
  { id: '1', name: 'Usuário 1', email: 'usuario1@email.com' },
  { id: '2', name: 'Usuário 2', email: 'usuario2@email.com' },
];

const tasks = [
  { id: '1', title: 'Tarefa 1', description: 'Descrição da tarefa 1', completed: false, userId: '1' },
  { id: '2', title: 'Tarefa 2', description: 'Descrição da tarefa 2', completed: true, userId: '1' },
  { id: '3', title: 'Tarefa 3', description: 'Descrição da tarefa 3', completed: false, userId: '2' },
];

const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (parent, args) => tasks.find(task => task.id === args.id),
    completedTasks: () => tasks.filter(task => task.completed),
    pendingTasks: () => tasks.filter(task => !task.completed),
    users: () => users,
  },
  Mutation: {
    createTask: (parent, args) => {
      const newTask = {
        id: (tasks.length + 1).toString(),
        title: args.title,
        description: args.description || null,
        completed: false,
        userId: args.userId,
      };
      tasks.push(newTask);
      return newTask;
    },
    markTaskAsCompleted: (parent, args) => {
      const task = tasks.find(task => task.id === args.id);
      if (!task) {
        throw new Error('Tarefa não encontrada');
      }
      task.completed = true;
      return task;
    },
    updateTask: (parent, args) => {
      const task = tasks.find(task => task.id === args.id);
      if (!task) {
        throw new Error('Tarefa não encontrada');
      }
      if (args.title) {
        task.title = args.title;
      }
      if (args.description) {
        task.description = args.description;
      }
      if (args.completed !== undefined) {
        task.completed = args.completed;
      }
      return task;
    },
    deleteTask: (parent, args) => {
      const index = tasks.findIndex(task => task.id === args.id);
      if (index === -1) {
        throw new Error('Tarefa não encontrada');
      }
      const deletedTask = tasks.splice(index, 1)[0];
      return deletedTask;
    },
  },
  Task: {
    user: (task) => users.find(user => user.id === task.userId),
  },
};



