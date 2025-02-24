import Express, { Router } from 'express';
// const router = Express.Router();
// router.get('/', (req, res) => {
//     res.send('Hello World');
//     });
const app = Express();



app.listen(3000, () => {
    console.log('Server is running: on http://localhost:3000');
    });