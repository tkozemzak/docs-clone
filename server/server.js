require("dotenv").config();

const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect("mongodb://localhost/docs-clone-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const defaultValue = "";

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", (documentId) => {
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });

  console.log("Connected");
});

const findOrCreateDocument = async (id) => {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
};
