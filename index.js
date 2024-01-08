const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const userRouter = require("./routers/users");
const blogRouter = require("./routers/blog");
const dev = process.env.NODE_ENV !== "production";
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://vivekkn91:Y4k9BlTg7WrkGDkz@cluster0.mmld4hx.mongodb.net/blog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const server = express();
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// Parse incoming JSON requests
server.use(cors());
// Custom Middleware
// server.use((req, res, next) => {
//   next();
// });

// API routes
server.use("/", userRouter);
server.use("/", blogRouter);

// Handle other Next.js routes
server.all("*", (req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});
