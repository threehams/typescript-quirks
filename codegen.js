module.exports = {
  schema: "http://localhost:8000/___graphql",
  documents: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/gatsby*/!(node_modules)/**/*.js",
  ],
  generates: {
    "./src/graphqlTypes.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
}
