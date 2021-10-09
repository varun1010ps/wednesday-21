const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const passport = require("passport");
const http = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const keys = require("./config/key");

//Database setup
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Database connected"))
  .catch((err) => console.log(err));

//App setup
const app = express();

//middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("combined"));
app.use(cors());
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey],
  })
);

//App routes
app.get("/api", function (req, res) {
  res.send("server connected");
});


require("./routes/imageUpload.routes")(app);
require("./routes/audioUpload.routes")(app);
require("./routes/adminAuth.routes")(app);
require("./routes/userAuth.routes")(app);
require('./routes/organization.routes')(app);
require("./routes/theme.routes")(app);
require("./routes/topic.routes")(app);
require("./routes/sessionBeta.routes")(app);
require("./routes/stories.routes")(app);
require("./routes/journalQuestion.routes")(app);
require("./routes/journal.routes")(app);
require("./routes/Episode.routes")(app);
require("./routes/team.routes")(app);
require("./routes/payment.routes")(app);
require('./routes/user.routes')(app);
require('./routes/favourite.routes')(app);

//production enviornment
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("admin/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "admin", "build", "index.html"));
  });
}

//Server Setup

const PORT = process.env.PORT || 5080;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server connect on ${PORT}`));
