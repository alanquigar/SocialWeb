
import {ApolloServer,gql} from 'apollo-server'
import {v1 as uuid} from 'uuid'
import axios from 'axios'


const typeDefs = gql`
    enum Genero {
        Masculino
        Femenino
    }
    type Person {
        name: String!
        lastname: String!
        phone: String!
        age: Int!
        genero: String!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(
            name: String
            lastname: String
            phone: String
            age: Int
            genero: String
            city: String
            id: ID
            ): Person
    }

    type Mutation {
        addPerson(
            name: String!
            lastname: String!
            phone: String!
            age: Int!
            genero: String!
            city: String!
            id: ID!
        ): Person
       editNumber(
        name: String!
        phone: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personCount:async () => 
        {
            const {data: persons} = await axios.get('http://localhost:3000/persons')
            return persons.length
        },
        allPersons: async (root, args) => {
            const {data: persons} = await axios.get('http://localhost:3000/persons')
            return persons
        },
        findPerson: async (root, args) => {
            const {data: persons} = await axios.get('http://localhost:3000/persons')
            const {name} = args
            return persons.find(person => person.name == name)
        }
    },
    Mutation:{
        addPerson: (root,args) => {
            if(persons.find(p => p.phone == args.phone)){
                throw new Error('Este numero ya tiene una cuenta asociada')
            }
            const person = {...args,id:uuid()}
            persons.push(person)
            return person
        },
        editNumber: (root,args) => {
            const personIndex = persons.findIndex(p => p.name == args.name)
            if(personIndex == -1) return null

            const person = persons[personIndex]
            
            const updatedPerson  = {...person, phone: args.phone}

            persons[personIndex] = updatedPerson
            return updatedPerson
        }
        
    }
}


const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)

})