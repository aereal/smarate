module.exports = {
  client: {
    addTypename: true,
    includes: [
      'src/**/*.{tsx,ts}',
    ],
    service: {
      localSchemaFile: '../../api/schema.graphql'
    },
  },
};
