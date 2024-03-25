import winston from "winston";
const customLevelOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: 'white',
        http: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'magenta',
        fatal: 'red'
    }
}


const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'fatal',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'warning',
            filename: './customLog.log',
            format: winston.format.simple()
        })
    ]
})
console.debug = logger.debug;
console.http = logger.http;
console.info = logger.info;
console.warning = logger.warning;
console.error = logger.error;
console.fatal = logger.fatal;
export const addLogger = (req, res, next) => {
   
    req.logger = logger;
      next();
    };