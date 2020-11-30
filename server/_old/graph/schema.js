const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Query {
    products: [Product]
    product(id: Int!): Product
  }
  type Product {
    id: Int,
    name: String,
    description: String
  }
  input ProductInput {
    name: String,
    description: String
  }
  type Mutation {
    login(email: String!): String # token
    createProduct(product: ProductInput): String
  }
`
module.exports = typeDefs;