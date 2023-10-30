# API GraphQL de Gerenciamento de Tarefas

Esta é uma API GraphQL que fornece acesso a dados de uma aplicação fictícia de gerenciamento de tarefas. Os usuários podem criar tarefas, marcar tarefas como concluídas, listar tarefas e obter detalhes específicos de uma tarefa.

## Índice

- [Tipos de Dados](#tipos-de-dados)
- [Consultas](#consultas)
- [Mutações](#mutações)

## Tipos de Dados

### `Task`

- `id` (ID): Identificador único da tarefa.
- `title` (String): Título da tarefa.
- `description` (String): Descrição da tarefa (pode ser nula).
- `completed` (Boolean): Indica se a tarefa está concluída.
- `user` (User): O usuário associado a esta tarefa.

### `User`

- `id` (ID): Identificador único do usuário.
- `name` (String): Nome do usuário.
- `email` (String): Endereço de e-mail do usuário.
- `tasks` ([Task]): Lista de tarefas associadas a este usuário.

## Consultas

### `tasks`

Retorna uma lista de todas as tarefas.

#### Exemplo de consulta:

```graphql
query {
  tasks {
    id
    title
    completed
  }
}
### `task`

Retorna detalhes de uma tarefa específica com base em seu ID.

Exemplo de consulta:


query {
  task(id: "1") {
    id
    title
    description
    completed
    user {
      name
    }
  }
}

### `completedTasks`

Retorna uma lista de tarefas concluídas.

Exemplo de consulta:


query {
  completedTasks {
    id
    title
  }
}

### `pendingTasks`

Retorna uma lista de tarefas pendentes.

Exemplo de consulta:


query {
  pendingTasks {
    id
    title
  }
}

### `users`

Retorna uma lista de todos os usuários.


query {
  users {
    id
    name
  }
}


### `MUTAÇÕES`


### `createTask`

Cria uma nova tarefa.

Exemplo de mutação:


mutation {
  createTask(title: "Nova Tarefa", description: "Descrição da nova tarefa", userId: "1") {
    id
    title
    completed
  }
}

### `markTaskAsCompleted`

Marca uma tarefa como concluída com base em seu ID.

Exemplo de mutação:


mutation {
  markTaskAsCompleted(id: "1") {
    id
    title
    completed
  }
}

### `updateTask`

Atualiza informações de uma tarefa existente.

Exemplo de mutação:


mutation {
  updateTask(id: "1", title: "Título Atualizado", completed: true) {
    id
    title
    completed
  }
}

### `deleteTask`

Exclui uma tarefa com base em seu ID.

Exemplo de mutação:

mutation {
  deleteTask(id: "1") {
    id
    title
  }
}







