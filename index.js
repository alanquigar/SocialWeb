
import {ApolloServer,gql} from 'apollo-server'
import {v1 as uuid} from 'uuid'

const persons = [
    {
        name:"Alan",
        lastname: "Quinones",
        phone: "656-572-3869",
        age: 21,
        city: "Juarez",
        id: "1"
    },
    {
        name:"Damian",
        lastname: "Venegas",
        age: 19,
        city: "Chihuahua",
        id: "2"
    },
    {
        name:"Felix",
        lastname: "Franco",
        phone: "656-124-5252",
        age: 23,
        city: "Juarez",
        id: "3"
    }
]

const typeDefs = gql`
    type Person {
        name: String!
        lastname: String!
        phone: String
        age: Int!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }

    type Mutation {
        addPerson(
            name: String!
            lastname: String!
            phone: String
            age: Int!
            city: String!
        ): Person
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
    },
    Mutation:{
        addPerson: (root,args) => {
            const person = {...args,id:uuid()}
            persons.push(person)
            return person
        }
    }
}


const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)

})