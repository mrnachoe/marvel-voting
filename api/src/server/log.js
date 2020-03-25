import fs from "fs";
import path from "path";
import morgan from "morgan";

/*
 * Comment
 * Logs are not very informative or helpful
 * For example, you could have easily logged something helpful such as "Created new session - {sessionId} - {sessionURI}"
 * The logging is a generic log of network requests in base express form.

::ffff:172.18.0.1 - - [25/Mar/2020:16:34:23 +0000] "GET / HTTP/1.1" 404 139
::ffff:172.18.0.1 - - [25/Mar/2020:16:34:47 +0000] "GET /sessions HTTP/1.1" 200 4
::ffff:172.18.0.1 - - [25/Mar/2020:16:34:47 +0000] "GET /favicon.ico HTTP/1.1" 404 150
::ffff:172.18.0.1 - - [25/Mar/2020:16:35:23 +0000] "GET /sessions HTTP/1.1" 304 -
::ffff:172.18.0.1 - - [25/Mar/2020:16:35:26 +0000] "POST /sessions HTTP/1.1" 200 4
::ffff:172.18.0.1 - - [25/Mar/2020:16:35:31 +0000] "POST /sessions HTTP/1.1" 200 4
::ffff:172.18.0.1 - - [25/Mar/2020:16:36:02 +0000] "GET /sessions HTTP/1.1" 200 4
::ffff:172.18.0.1 - - [25/Mar/2020:16:36:05 +0000] "GET /sessions HTTP/1.1" 304 -
::ffff:172.18.0.1 - - [25/Mar/2020:16:36:07 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:02 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:02 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:03 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:03 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:03 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:04 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:04 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:03:04 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:04:08 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:04:10 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:04:13 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:10:27 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:10:28 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:10:59 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:11:00 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:12:18 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:12:21 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:12:38 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:12:38 +0000] "POST /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:13:33 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:13:36 +0000] "POST /sessions HTTP/1.1" 200 130
::1 - - [25/Mar/2020:17:15:12 +0000] "GET /sessions HTTP/1.1" 200 130
::1 - - [25/Mar/2020:17:15:25 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:15:30 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:15:31 +0000] "GET /sessions/-M3HfqCIg0Da2zVMv7YK HTTP/1.1" 200 105
::1 - - [25/Mar/2020:17:15:31 +0000] "GET /votes/-M3HfqCIg0Da2zVMv7YK HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:15:34 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:35 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:36 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:36 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:36 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:37 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:37 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:38 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:38 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:15:40 +0000] "POST /votes HTTP/1.1" 200 114
::1 - - [25/Mar/2020:17:34:52 +0000] "GET /sessions/-M3HfqCIg0Da2zVMv7YK HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:34:52 +0000] "GET /votes/-M3HfqCIg0Da2zVMv7YK HTTP/1.1" 200 227
::1 - - [25/Mar/2020:17:34:55 +0000] "GET /sessions HTTP/1.1" 200 537
::1 - - [25/Mar/2020:17:34:58 +0000] "POST /sessions HTTP/1.1" 200 537
::1 - - [25/Mar/2020:17:35:00 +0000] "GET /sessions HTTP/1.1" 200 537
::1 - - [25/Mar/2020:17:35:01 +0000] "POST /sessions HTTP/1.1" 200 537
::1 - - [25/Mar/2020:17:35:03 +0000] "GET /sessions HTTP/1.1" 200 537
::1 - - [25/Mar/2020:17:35:04 +0000] "POST /sessions HTTP/1.1" 200 537
::1 - - [25/Mar/2020:17:35:05 +0000] "GET /sessions HTTP/1.1" 200 537
::1 - - [25/Mar/2020:17:35:18 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:35:20 +0000] "POST /sessions HTTP/1.1" - -
::1 - - [25/Mar/2020:17:35:21 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:35:30 +0000] "GET /sessions HTTP/1.1" 200 4
::1 - - [25/Mar/2020:17:35:32 +0000] "POST /sessions HTTP/1.1" - -
::1 - - [25/Mar/2020:17:35:33 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:35:34 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:35:34 +0000] "GET /sessions HTTP/1.1" 200 102
::1 - - [25/Mar/2020:17:35:35 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:35:39 +0000] "POST /sessions HTTP/1.1" - -
::1 - - [25/Mar/2020:17:35:39 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:35:40 +0000] "GET /sessions HTTP/1.1" 200 206
::1 - - [25/Mar/2020:17:35:41 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:36:02 +0000] "GET /sessions HTTP/1.1" 304 -
::1 - - [25/Mar/2020:17:36:04 +0000] "POST /sessions HTTP/1.1" 200 206


 */

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
