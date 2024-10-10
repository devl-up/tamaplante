const config = {
  api: {
    output: {
      target: "src/api/types/index.ts",
      client: "react-query",
      prettier: true,
      override: {
        useNativeEnums: true,
        mutator: {
          path: "src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    input: "http://localhost:5000/swagger/v1/swagger.json",
  },
};

module.exports = config;
