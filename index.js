import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url'; 
import path from 'path';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import userRoutes from './routes/api.js';
import environment from './config/Config.js';

dotenv.config();
var app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath : true
}));

app.use(cors()); 
app.use('/', userRoutes);

app.use("/public", express.static(path.join(__dirname, 'public')));

// const localDatabase = process.env.DATABASE;
const localDatabase = process.env.server === "local" ? environment.local.DATABASE : environment.staging.DATABASE;;

mongoose.connect(localDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
    console.log('Database connected Successfully');
}).on('error', function (err) {
    console.log('Error', err);
});

console.log(process.env.server, "server");
// console.log("DATABASE_url:", environment.staging.DATABASE);
const usePort = process.env.server === "local" ? environment.local.PORT : environment.staging.PORT;
const listningPORT = usePort;
// const listningPORT = process.env.PORT;
app.listen(listningPORT, function () {
    console.log(`Server started on port ${listningPORT}`);
});
