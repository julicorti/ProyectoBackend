import winston from 'winston';

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
};

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'info',
            filename: './customLog.log',
            format: winston.format.simple()
        })
    ]
});

// No modifiques los métodos del objeto console directamente.
// En su lugar, usa el logger en tu código donde lo necesites.

export const addLogger = (req, res, next) => {
    req.logger = logger;
    next();
};

export default logger;
