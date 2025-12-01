import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();
const app = express();

// Config middlewares
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/uploads", express.static("uploads")); // 
// ---- CONFIGURACIÓN SWAGGER ----
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sindicato Regional API",
      version: "1.0.0",
      description: "API para la gestión de usuarios, monitoreo ESP32/A9G y datos globales"
    },
    servers: [
      { url: "http://localhost:5000" }
    ]
  },
  apis: ["./routes/*.js"] 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---- INICIO DEL SERVIDOR ----
app.listen(5000, () => console.log('Server running at port 5000'));
