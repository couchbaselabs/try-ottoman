const ottoman = require('ottoman');
const dotenv = require('dotenv');
dotenv.config();

ottoman.globalConfig({
    collectionKey: 'type',
    disableScopes: true
});

ottoman.connect({
    bucketName: 'travel-sample',
    connectionString: 'couchbase://localhost:8091',
    username: 'Administrator',
    password: 'password'
});