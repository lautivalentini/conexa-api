import config from "./config";
import { startConnection } from "./database";

import app from "./app";

const init = async () => {
  // Connection to MongoDB
  await startConnection();

  app.listen(config.PORT, () => {
    console.log(`> Ready on http://localhost:${config.PORT}`);
  });
};

init();
