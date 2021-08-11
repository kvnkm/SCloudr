import http from "http";
import express, { Application } from "express";
import log from "./config/logging";
import config from "./config/config";
import routes from "./routes";

const NAMESPACE = "Server";
const router: Application = express();

// Logging the request
router.use((req, res, next) => {
    log(
        "INFO",
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
        log(
            "INFO",
            NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
});

// Parse the request
router.use(express.json());

// Rules of the API
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
        return res.status(200).json({});
    }

    next();
});

// Routes
router.use("/SCloudr", routes.SCloudr);

// Error handling
router.use((req, res, next) => {
    const error = new Error("not found");

    return res.status(404).json({
        message: error.message
    });
});

// Create the server
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>
    log("INFO", NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`)
);
