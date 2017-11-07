import * as log from 'log4js';

export class QLOG {
    errorLog: log.Logger;
    traceLog: log.Logger;
    infoLog: log.Logger;
    debugLog: log.Logger;
    constructor(dir) {
        log.configure({
            appenders: {
                log: {
                    type: 'multiFile',
                    base: `logs`,
                    property: 'categoryName',
                    extension: '.log'
                },
                console: {
                    type: 'console'
                }
            },
            categories: {
                default: {
                    appenders: ['log', 'console'],
                    level: 'trace'
                }
            }
        });

        this.traceLog = log.getLogger('normal');
        this.errorLog = log.getLogger('error');
        this.infoLog = log.getLogger('info');
        this.debugLog = log.getLogger('debug');
    }

    t(data) {
        this.traceLog.trace(data);
    }

    error(data) {
        this.errorLog.error(data);
    }

    info(data) {
        this.infoLog.info(data);
    }

    debug(data) {
        this.debugLog.debug(data);
    }

    getlog() {
        return
    }
}

export function logconfig() {
    return {
        appenders: {
            log: {
                type: 'multiFile',
                base: `logs`,
                property: 'categoryName',
                extension: '.log'
            },
            console: {
                type: 'console'
            }
        },
        categories: {
            default: {
                appenders: ['log', 'console'],
                level: 'trace'
            }
        }
    }
}