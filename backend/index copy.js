// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// whatever request comes with /api/v1 as route ,it will directly route it to rootRouter where all routes will be defined
// also ex- /api/v1 and in rootRouter there will ('/',got to this component )
// means on every call of url ('api/v1/) it will route the defined component for '/' in rootRouter
app.use("/api/v1", rootRouter);
app.listen(3000);
