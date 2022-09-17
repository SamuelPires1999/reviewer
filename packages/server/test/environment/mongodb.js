const { MongoMemoryServer } = require('mongodb-memory-server-global');
const NodeEnvironment = require('jest-environment-node');

class MongoDbEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);

        this.mongod = new MongoMemoryServer({
            binary: {
                version: '4.0.5',
            },
        });
    }

    async setup() {
        await super.setup();
        await this.mongod.start();

        this.global.__MONGO_URI__ = this.mongod.getUri();

        this.global.__COUNTERS__ = {
            user: 0,
        };
    }

    async teardown() {
        await super.teardown();
        await this.mongod.stop();
        this.mongod = null;
        this.global = {};
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = MongoDbEnvironment;