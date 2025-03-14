import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Vacations  posts",
            version: "1.0.2",
            description: "A complex express library for vacations posts"
        },
        servers: [
            { url: "http://localhost:5000" }
        ],
        components: {
            schemas: {
                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties:{
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "12345" },
                    }
                },
                Comment:{
                    type:"object",
                    required:[],
                    properties:{
                        _id: { type: "string", example: "64f5b3c7e4b08c1234567890" },
                        postId: { type: "string", example: "64f5b3c7e4b08c1234567890" },
                        comment: { type: "string", example: "I like the post" },
                        createdAt: { type: "datetime", example: "2025-03-12T11:26:00" },
                        user: { type: "string", example: "64f5b3c7e4b08c1234567890" },
                    }
                },
                User: {
                    type: "object",
                    required: ["firstName", "lastName", "email", "password"],
                    properties: {
                        _id: { type: "string", example: "64f5b3c7e4b08c1234567890" },
                        firstName: { type: "string", example: "John" },
                        lastName: { type: "string", example: "Doe" },
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "12345" },
                        image: { type: "string", example: "pic.jpg" },
                    },
                },
            },
        }
    },
    apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

export const addSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}