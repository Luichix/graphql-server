const { createServer } = require('http')
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { PubSub } = require('graphql-subscriptions')

const messages = [
  {
    _id: 6,
    text: 'Unicamente, comenteme la hora de entrega por favor.',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: '4477f03f-4a6f-b2a9-73447345711a',
    text: 'En un momento, le confirmo la hora de entrega',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 'luigui.rex@gmail.com',
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: '4477f03f-6e05-4a6f-b2a9-73447345711a',
    text: 'Esta bien, no hay ningun problema, unicamente me comparte su nombre y numero de telefono.',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 'luigui.rex@gmail.com',
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: '4477f03f-6e05-4a6f-b2a9',
    text: 'Buenos dias, si tenemos queso palmito en estos momentos.',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 'luigui.rex@gmail.com',
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: 5,
    text: 'Unicamente, comenteme la hora de entrega por favor.',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: 4,
    text: 'Comenteme porfavor, lo necesitaba para enviar al extranjero, si me puede hacer el encargo de unas 5 libras para el dia miercoles de la proxima semana, le agradecere.',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 3,
    text: 'Tiene queso Palmito en estos momentos?',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 2,
    text: 'Deseaba realizar una consulta!',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 1,
    text: 'Hola',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
]

const pubsub = new PubSub()

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    avatar: String
  }
  type Message {
    _id: ID!
    text: String!
    createdAt: String!
    user: User!
  }
  type Query {
    messages: [Message!]
  }
  type Mutation {
    postMessage(text: String!, createdAt: String!): ID!
  }
  type Subscription {
    messages: [Message!]
  }
`

// const subscribers = []
// const onMessagesUpdates = (fn) => subscribers.push(fn)

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, { text, createdAt }) => {
      const user = {
        _id: 'uid',
        name: 'Client One',
        avatar: 'https://i.pravatar.cc/300',
      }
      const _id = messages.length + 1
      messages.unshift({ _id, text, createdAt, user })
      pubsub.publish('messages', { messages })
      // subscribers.forEach((fn) => fn())
      return _id
    },
  },
  Subscription: {
    messages: {
      subscribe: () => pubsub.asyncIterator('messages'),
    },
  },
}
// Subscription: {
//   messages: {
//     subscribe: (parent, args, { pubsub }) => {
//       const channel = Math.random().toString(36).substring(2, 15)
//       onMessagesUpdates(() => pubsub.publish(channel, { messages }))
//       setTimeout(() => pubsub.publish(channel, { messages }), 0)
//       return pubsub.asyncIterator(channel)
//     },
//   },
// },

const startApolloServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    context: { pubsub },
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({ app, path: '/graphql', cors: true })
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}

startApolloServer()
