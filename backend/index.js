const express = require("express");
const rootRouter = require('./routes/index');
//cors:
const cors = require('cors');

const app = express();


app.use(cors())
app.use(express.json())


//attaching a prefix "api/v1" to routes with the app.use middleware thing
app.use("/api/v1",rootRouter);


app.listen(3000,()=>console.log('server listening on port 3000...'))


