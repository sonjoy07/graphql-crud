const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const Book = require('./models/books')



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find();
            }
        }

    }
})

const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString }
            },
            resolve(parent, args) {
                try {
                    const book = new Book({
                        name: args.name,
                        genre: args.genre
                    })
                    return book.save();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
})

var schema = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutations
});
module.exports = schema