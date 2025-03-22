import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

console.log(process.env.DOMAIN_BASE+":"+process.env.PORT)
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Vacations  posts",
            version: "1.0.2",
            description: "A complex express library for vacations posts"
        },
        servers: [
            { url: process.env.DOMAIN_BASE+":"+process.env.PORT },
            {url: 'http://10.10.246.131'},
            {url: 'https://10.10.246.131'},
        ],
        components: {
            securitySchemas:{
                bearerAuth:{
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
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
                    required:["_id", "postId", "comment", "createdAt", "user"],
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
                    required: ["firstName", "lastName", "birthDate", "email", "password", "image"],
                    properties: {
                        firstName: { type: "string", example: "John" },
                        lastName: { type: "string", example: "Doe" },
                        birthDate: { type: "datetime", example: "1990-03-12" },
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "12345" },
                        image: { type: "string", example: "pic.jpg" },
                    },
                },
                Post: {
                    type: "object",
                    required: ["_id", "content", "creationDate", "image", "user", "likes"],
                    properties: {
                        _id: { type: "string", example: "64f5b3c7e4b08c1234567890" },
                        content: { type: "string", example: "I had a great time" },
                        creationDate: { type: "datetime", example: "2025-03-12T11:26:00" },
                        image: { type: "string", example: "pic.jpg" },
                        user: { type: "string", example: "64f5b3c7e4b08c1234567890" },
                        likes: { type: "array", items: { type: "string" }, example: ["64f5b3c7e4b08c1234567890"] },
                    }
                },
                RefreshToken:{
                    type: "object",
                    required: ["refreshToken"],
                    properties:{
                        refreshToken:{type: 'string', example:'abc123abc234abc123'}
                    }
                },
                Token:{
                    type: "object",
                    required: ["token"],
                    properties:{
                        token:{type: 'string', example:'abc123abc234abc123'}
                    }
                }

            },
        }
    },
    apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

export const addSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}