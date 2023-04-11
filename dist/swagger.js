"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
