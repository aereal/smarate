module.exports = {
  client: {
    addTypename: true,
    includes: [
      'src/**/*.{tsx,ts}',
    ],
    service: {
      localSchemaFile: '../functions/schema.graphql'
    },
  },
};
