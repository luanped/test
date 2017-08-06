const isProduction = process.env.NODE_ENV === 'production'; // eslint-disable-line

const productionLogger = {
    info: () => {},
    warn: () => {},
    error: () => {}
};

//This is just a nice to have util class to demonstrate factory pattern, but not really providing anything towards the exercise
//hence it's implementation is left simple on purpose and no test is provided, as it's not the focus
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