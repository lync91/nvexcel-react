const getProducts = () => {
  return Promise.resolve(products);
}
module.exports = {
  Query: {
    products: async () => getProducts
  },
  Mutation: {}
};