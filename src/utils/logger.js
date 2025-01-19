"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracer = require("tracer");
const LOG_LEVEL = process.env.NODE_ENV === "production" ? "info" : "log";
const logger = tracer.colorConsole({ level: LOG_LEVEL });
exports.default = logger;
