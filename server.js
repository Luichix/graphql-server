const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')

const persons = [
  {
    mid: '3d594650-3436-11e9-bc57-8b80ba54c431',
    uid: 'O2HVhBuo3rfbyxirZgKebNridkE2',
    name: 'Luis Reynaldo',
    email: 'luisreynaldo.pch@gmail.com',
    phoneNumber: '50584555589',
    industry: 'Software',
    employeeCount: '10000',
    country: 'US',
    city: 'Chinandega',
    address: 'Hotel Glomar 3 1/2 al sur',
    company: 'ChessLand',
  },
]

const typeDefs = gql`
  type Person {
    uid: String
    name: String
    email: String
    phoneNumber: String
    industry: String
    employeeCount: String
    city: String
    address: String
    company: String
    country: String
    id: String
  }

  type AddPerson {
    mid: String
  }

  type UpdatePerson {
    modified: String
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    userInfo(uid: String): Person
  }
  type Mutation {
    addUser(
      uid: String!
      name: String
      email: String!
      phoneNumber: String
      industry: String
      employeeCount: String
      country: String
      city: String
      address: String
      company: String
    ): AddPerson

    updateUser(
      uid: String!
      name: String
      email: String
      phoneNumber: String
      industry: String
      employeeCount: String
      country: String
      city: String
      address: String
      company: String
    ): UpdatePerson
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
    userInfo: (root, args) => persons.find((p) => p.uid === args.uid),
  },
  Mutation: {
    addUser: (root, args) => {
      const person = {
        uid: args.uid,
        name: args.name,
        email: args.email,
        phoneNumber: args.phoneNumber,
        industry: args.industry,
        employeeCount: args.employeeCount,
        country: args.country,
        city: args.city,
        address: args.address,
        company: args.company,
      }
      persons.push(person)
      return { mid: 'register' }
    },
    updateUser: (root, args) => {
      const personIndex = persons.findIndex((p) => p.uid === args.uid)
      if (personIndex === -1) return { modified: 'false' }
      const person = persons[personIndex]
      const newPerson = { ...person, ...args }
      persons[personIndex] = newPerson
      return { modified: 'modified' }
    },
  },
}
async function startApolloServer() {
  const app = express()
  const httpServer = app
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  // Mount Apollo middleware here.
  server.applyMiddleware({ app, path: '/graphql', cors: true })
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}

startApolloServer()
