import "dotenv/config";
import cors from "cors";
import express from "express";

import { errorHandler } from "./handler/error-handler.js";
import { employeeRouter } from "./handler/users/index.js";
import { connectDB, disconnectDB } from "./lib/prisma.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRouter);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  const shutdown = () => {
    console.log("Shutting down server...");

    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

startServer();
