require("dotenv").config();

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected");
});
