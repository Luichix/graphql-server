const { createServer } = require('@graphql-yoga/node')

const messages = [
  {
    _id: 6,
    text: 'Unicamente, comenteme la hora de entrega por favor.',
    createdAt: new Date(),
    user: {
      _id: 1,
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: '4477f03f-4a6f-b2a9-73447345711a',
    createdAt: '2022-06-08T03:45:51.720Z',
    text: 'En un momento, le confirmo la hora de entrega',
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: '😋 Yes',
          value: 'yes',
        },
        {
          title: '😞 Nope. What?',
          value: 'no',
        },
      ],
    },
    sent: true,
    received: true,
    pending: true,
    user: {
      _id: 'luigui.rex@gmail.com',
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: '4477f03f-6e05-4a6f-b2a9-73447345711a',
    createdAt: '2022-06-08T03:45:51.720Z',
    text: 'Esta bien, no hay ningun problema, unicamente me comparte su nombre y numero de telefono.',
    sent: true,
    received: true,
    pending: true,
    user: {
      _id: 'luigui.rex@gmail.com',
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: '4477f03f-6e05-4a6f-b2a9',
    createdAt: '2022-06-08T03:45:51.720Z',
    text: 'Buenos dias, si tenemos queso palmito en estos momentos.',
    sent: true,
    received: true,
    pending: true,
    user: {
      _id: 'luigui.rex@gmail.com',
      avatar: 'https://i.pravatar.cc/300',
    },
  },
  {
    _id: 5,
    text: 'Unicamente, comenteme la hora de entrega por favor.',
    createdAt: '2022-06-08T03:45:51.720Z',
    sent: true,
    received: true,
    pending: true,
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
      name: 'Client One',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 3,
    text: 'Tiene queso Palmito en estos momentos?',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      name: 'Client One',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 2,
    text: 'Deseaba realizar una consulta!',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      name: 'Client One',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 1,
    text: 'Hola',
    createdAt: '2022-06-08T03:45:51.720Z',
    user: {
      _id: 1,
      name: 'Client One',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
]

const typeDefs = `

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
`
// type Mutation {
//     postMessage(user: String!, text: String!): Message: ID!
// }

const resolvers = {
  Query: {
    messages: () => messages,
  },
  // Mutation: {
  //   postMessage: (parent, { user, text }) => {
  //     const id = messages.length
  //     messages.push({ id, user, text })
  //     return id
  //   },
  // },
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
})
server.start()
