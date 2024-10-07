import app from './app';
import env from './util/validateEnv';
import mongoose from "mongoose";
const PORT = env.PORT;

mongoose.connect(env.MONGODB_CONNECT_STRING)
.then(() => {
    console.log("Server connected");
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
})
.catch(console.error)