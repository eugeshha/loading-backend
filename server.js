const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const slow = require("koa-slow");

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

const articles = [
  {
    id: 1,
    title: "Премьера нового блокбастера",
    description: "В прокат вышел долгожданный фильм от известного режиссера.",
  },
  {
    id: 2,
    title: "Фестиваль авторского кино",
    description: "В столице стартовал фестиваль независимого кино.",
  },
  {
    id: 3,
    title: "Объявлены номинанты на премию",
    description: "Стали известны претенденты на главную кинопремию года.",
  },
];

app.use(cors());

app.use(
  slow({
    delay: 2000,
  }),
);

router.get("/api/data", async (ctx) => {
  ctx.body = {
    status: "ok",
    data: {
      title: "Новости мира кино",
      items: articles,
      timestamp: Date.now(),
    },
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

