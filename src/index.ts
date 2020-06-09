import App from './api/app/app';

const app = new App().app;

const port = 3000;

app.listen(port,() => {
    console.log(`app listening on port ${port}`);
}).on('error', err => {
    console.log(err);
})