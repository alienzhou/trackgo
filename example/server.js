const Koa       = require('koa');
const serve     = require('koa-static');
const Router    = require('koa-router');
const koaBody   = require('koa-body');

const port = process.env.port || 8080;
const app = new Koa();
const router = new Router();

app.use(serve(`${__dirname}/page`));
app.listen(port, () => console.log(`trackgo example is running on port: ${port}`));