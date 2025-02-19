import karma = require('karma');
import { Config, ConfigOptions, Server } from 'karma';

karma.runner.run({ port: 9876 }, exitCode => {
    exitCode; // $ExpectType number
    process.exit(exitCode);
});

karma.stopper.stop({ port: 9876 }, exitCode => {
    exitCode; // $ExpectType number
    if (exitCode === 0) {
        // do something
    }
    process.exit(exitCode);
});

new Server({ logLevel: 'debug', port: 9876 }, exitCode => {
    exitCode; // $ExpectType number
    process.exit(exitCode);
});

karma.config.parseConfig(null, { port: 9876 }, { promiseConfig: true, throwErrors: true }).then(karmaConfig => {
    const server = new Server(karmaConfig, exitCode => {
        exitCode; // $ExpectType number
        process.exit(exitCode);
    });

    server.start(); // $ExpectType Promise<void>

    server.refreshFiles(); // $ExpectType Promise<any>
    server.refreshFile('src/js/module-dep.js'); // $ExpectType Promise<any>
    server.on('browser_register', (browser: any) => {
        browser; // $ExpectType any
    });

    server.on('run_complete', (browsers, results) => {
        results.disconnected = false;
        results.error = false;
        results.exitCode = 0;
        results.failed = 9;
        results.success = 10;
    });

    server.stop(); // $ExpectType Promise<void>

    karma.runner.run(karmaConfig, (exitCode: number) => {
        exitCode; // $ExpectType number
        process.exit(exitCode);
    });

    karma.stopper.stop(karmaConfig, exitCode => {
        exitCode; // $ExpectType number
        if (exitCode === 0) {
            // do something
        }
        process.exit(exitCode);
    });
});

const testLauncher = (launcher: karma.launcher.Launcher) => {
    const captured = launcher.areAllCaptured(); // $ExpectType boolean
};

// Example of configuration file conf.ts, see http://karma-runner.github.io/latest/config/configuration-file.html
module.exports = (config: Config) => {
    config.set({
        logLevel: config.LOG_DEBUG,
        basePath: '..',
        urlRoot: '/base/',
        frameworks: ['jasmine'],

        files: [
            { pattern: 'lib/angular.js', watched: false },
            'test/unit/*.spec.js',
            { pattern: 'compiled/index.html', watched: false },
            { pattern: 'app/index.html', included: false, served: false },
            { pattern: 'compiled/app.js.map', included: false, served: true, watched: false, nocache: true },
            { pattern: 'test/images/*.jpg', watched: false, included: false, served: true, nocache: false },
        ],

        loggers: {
            custom: { type: 'file', filename: 'log.txt' },
        },

        reporters: ['progress', 'coverage'],

        middleware: ['foo', 'bar'],
        beforeMiddleware: ['foo', 'bar'],

        mime: {
            'text/x-typescript': ['ts', 'tsx'],
        },

        preprocessors: {
            'app.js': ['coverage'],
        },

        port: 9876,

        autoWatch: true,

        browserDisconnectTimeout: 20_000,
        browserDisconnectTolerance: 100,
        browserNoActivityTimeout: 10_000,
        browserSocketTimeout: 20_000,

        browsers: ['Chrome', 'Firefox', 'FirefoxHeadless'],
        customHeaders: [
            {
                match: '.*foo.html',
                name: 'Service-Worker-Allowed',
                value: '/',
            },
        ],
        customLaunchers: {
            ChromiumHeadless_without_security: {
                base: 'ChromiumHeadless',
                flags: ['--no-sandbox', '--disable-setuid-sandbox'],
            },
        },
        detached: true,
        failOnEmptyTestSuite: false,
        failOnSkippedTests: true,
        failOnFailingTestSuite: false,
        forceJSONP: true,
        formatError: msg => `error: ${msg}`,
        listenAddress: '0.0.0.0',
        pingTimeout: 2000,
        processKillTimeout: 3000,
        proxies: {
            '/static': 'http://gstatic.com',
            '/web': 'http://localhost:9000',
            '/img/': '/base/test/images/',
            '/proxyfied': {
                target: 'http://myserver.localhost',
                changeOrigin: true,
            },
        },
        proxyReq: (proxyReq, req, res, options) => {
            proxyReq.setHeader('Referer', 'https://www.example.com/');
        },
        proxyRes: (proxyRes, req, res) => {
            if (proxyRes.headers['set-cookie']) {
                proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map((cookie: string) => {
                    return cookie.replace(/\s*secure;?/i, '');
                });
            }
        },
        singleRun: true,
        restartOnFileChange: true,
        retryLimit: 5,
        browserConsoleLogOptions: {
            level: 'warn',
            format: '%b %T: %m',
            path: 'some/path/to.log',
            terminal: false,
        },
        upstreamProxy: {
            hostname: 'localhost',
            path: '/',
            port: 27001,
            protocol: 'http',
        },
    });
};

// custom browser config
const customBrowser = (config: Config) => {
    config.set({
        browsers: ['Safari', 'my-custom-browser', 'Firefox', '/usr/local/bin/custom-browser.sh'],
    });
};

// plugins
function CustomMiddlewareFactory(config: ConfigOptions) {
    return (request: any, response: any /* next */) => {
        response.writeHead(200);
        return response.end('content!');
    };
}

// plugin can be class or constructor function
const CustomPlugin = function CustomPlugin() {};
CustomPlugin.prototype = {
    log: () => {},
};
class CustomPluginClass {
    log: () => {};
}

const pluginsTests = (config: Config) => {
    config.set({
        middleware: ['custom'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            { 'framework:xyz': ['factory', CustomMiddlewareFactory] },
            { 'framework:abc': ['type', CustomPlugin] },
            { 'framework:abc': ['type', CustomPluginClass] },
            { 'framework:xyz': ['value', 5] },
        ],
    });
};
karma.constants.DEFAULT_HOSTNAME; // $ExpectType string
karma.VERSION; // $ExpectType string

const syncConfig: Config = karma.config.parseConfig('conf.js', {
    singleRun: true,
    restartOnFileChange: true,
});

const syncConfig2: Config = karma.config.parseConfig(
    'conf.js',
    {
        singleRun: true,
        restartOnFileChange: true,
    },
    {
        promiseConfig: false,
    },
);

const asyncConfig: Promise<Config> = karma.config.parseConfig(
    'conf.js',
    {
        singleRun: true,
        restartOnFileChange: true,
    },
    {
        promiseConfig: true,
        throwErrors: true,
    },
);

// constants
karma.VERSION; // $ExpectType string
karma.constants.VERSION; // $ExpectType string
karma.constants.DEFAULT_PORT; // $ExpectType string | number
karma.constants.DEFAULT_HOSTNAME; // $ExpectType string
karma.constants.DEFAULT_LISTEN_ADDR; // $ExpectType string
karma.constants.LOG_DISABLE; // $ExpectType "OFF"
karma.constants.LOG_ERROR; // $ExpectType "ERROR"
karma.constants.LOG_WARN; // $ExpectType "WARN"
karma.constants.LOG_INFO; // $ExpectType "INFO"
karma.constants.LOG_DEBUG; // $ExpectType "DEBUG"
karma.constants.LOG_LOG; // $ExpectType "LOG"
karma.constants.LOG_PRIORITIES; // $ExpectType ["OFF", "ERROR", "WARN", "LOG", "INFO", "DEBUG"]
karma.constants.COLOR_PATTERN; // $ExpectType string
karma.constants.NO_COLOR_PATTERN; // $ExpectType string
karma.constants.CONSOLE_APPENDER; // $ExpectType { type: string; layout: { type: string; pattern: string; }; }
karma.constants.EXIT_CODE; // $ExpectType string
karma.constants.LOG_PRIORITIES[5] === 'DEBUG';
