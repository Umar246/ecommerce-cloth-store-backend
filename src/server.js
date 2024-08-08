const app = require(".");
const connectDB = require("./Utils/DB");

const PORT = 5007;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Ecommerce store backend listening on PORT ${PORT}`);
  });
});