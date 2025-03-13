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
            { url: "http://localhost:5500" }
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
                User: {
                    type: "object",
                    required: ["firstName", "lastName", "email", "password"],
                    properties: {
                        id: { type: "string", example: "64f5b3c7e4b08c1234567890" },
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