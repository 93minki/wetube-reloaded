import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`?œ… Server Listening on port http://localhost:${PORT} ?ŸšğŸš?`);

app.listen(PORT, handleListening);
