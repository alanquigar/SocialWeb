
import {ApolloServer,gql} from 'apollo-server'

const persons = [
    {
        name:"Alan",
        phone: "656-572-3869",
        street: "Babicora",
        city: "Juarez",
        id: "1"
    },
    {
        name:"Damian",
        street: "Yepomera",
        city: "Chihuahua",
        id: "2"
    },
    {
        name:"Felix",
        phone: "656-124-5252",
        street: "Roma",
        city: "Juarez",
        id: "3"
    }
]

const typeDefs = gql`
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name == name)
        }
    }
}

const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})