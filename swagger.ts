import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "APIドキュメント",
      version: "1.0.0",
      description: "APIドキュメントの説明",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "開発環境",
      },
    ],
  },
  apis: ["./index.ts"], // swaggerでドキュメント生成するファイルを指定
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
