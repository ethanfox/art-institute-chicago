module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue/dist/" : "/",
};

const router = createRouter({
  history: createWebHistory("/vue/dist"),
  routes,
});
