const { createServer } = require('http')
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { PubSub } = require('graphql-subscriptions')

const SUBSCRIPTION_EVENTS = {
  MESSAGE_ADDED: 'MESSAGE_ADDED',
}

const messages = []

const pubsub = new PubSub()

const typeDefs = gql`
  type User {
    uid: ID!
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
    allMessages: [Message]!
  }
  type Mutation {
    addMessage(text: String!, createdAt: String!, uid: ID!): Message
  }
  type Subscription {
    messageAdded: Message!
  }
`

const resolvers = {
  Query: {
    allMessages: () => messages,
  },
  Mutation: {
    addMessage: (parent, { text, createdAt, uid }) => {
      const user = {
        uid: uid,
        name: 'Client One',
        avatar: 'https://i.pravatar.cc/300',
      }
      const _id = messages.length + 1
      const message = { _id, text, createdAt, user }
      messages.unshift(message)
      pubsub.publish(SUBSCRIPTION_EVENTS.MESSAGE_ADDED, {
        messageAdded: message,
      })
      return message
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(SUBSCRIPTION_EVENTS.MESSAGE_ADDED),
    },
  },
}

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
