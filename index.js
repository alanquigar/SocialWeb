
import {ApolloServer,gql} from 'apollo-server'
import {v1 as uuid} from 'uuid'

const persons = [
    {
        name:"Alan",
        lastname: "Quinones",
        phone: "656-572-3869",
        age: 21,
        genero: "Masculino",
        city: "Juarez",
        id: "1"
    },
    {
        name:"Damian",
        lastname: "Venegas",
        phone: "614-524-8562",
        age: 19,
        genero: "Masculino",
        city: "Chihuahua",
        id: "2"
    },
    {
        name:"Felix",
        lastname: "Franco",
        phone: "656-124-5252",
        age: 23,
        genero: "Masculino",
        city: "Juarez",
        id: "3"
    }
]

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
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
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