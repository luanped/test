const isProduction = process.env.NODE_ENV === 'production'; // eslint-disable-line

const productionLogger = {
    info: () => {},
    warn: () => {},
    error: () => {}
};

export default class LoggerFactory {
    static createLogger(name) {
        if (isProduction) {
            return productionLogger;
        }

        return {
            info: (...args) => console.info(name, ...args),
            warn: (...args) => console.warn(name, ...args),
            error: (...args) => console.error(name, ...args),
        };
    }
}