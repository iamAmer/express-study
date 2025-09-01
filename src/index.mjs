import express from "express";
import routes from './routes/index.mjs'
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(routes);
const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
    // this route that sets the cookies
    // you must visit first in order to authenticate & set it in the server side
    response.cookie('hello', 'world', {maxAge: 10000})
    response.status(201).send('Hello World');
})


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})