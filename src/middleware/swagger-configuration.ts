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
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export const addSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}