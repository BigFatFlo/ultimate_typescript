import express from 'express';
import remindersRouter from './routers/reminders';

const app = express();

// By default, express doesn't know how to parse the body of the request
// We need to use middleware to parse the body
app.use(express.json());
app.use('/reminders', remindersRouter);

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(8000, () => console.log("Server started+++"));