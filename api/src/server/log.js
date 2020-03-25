import fs from "fs";
import path from "path";
import morgan from "morgan";

const setupLogs = (app) => {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  const applicationLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });
  //access (apache) logs
  app.use(morgan('common', { stream: accessLogStream }));

  //4xx and 5xx errors
  app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 },
    stream: applicationLogStream
  }))
};

export default setupLogs;
