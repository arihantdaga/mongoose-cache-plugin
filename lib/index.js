const LocalStore = require('./stores/local');
const RedisStore = require('./stores/redis');
const store = {};

/**
 * @param {schema} schema
 * @param { options } options
 */
function cachePlugin(schema, options) {
    schema.pre(['find', 'findOne'], async function () {
        const queryString = getQueryString.apply(this);
        if (store[queryString]) {
            return queryString;
        }
    });

    schema.post(['find', 'findOne'], async function (docs) {
        console.log(this);
        console.log(docs);
        console.log('Post Hook');
        const queryString = getQueryString.apply(this);
        if (!store[queryString]) {
            store.queryString = docs;
        }
    });
}

/**
 * @return {string}
 */
function getQueryString() {
    const queryOptions = {
        op: this.op,
        query: sortObject(this.getFilter()),
        fields: sortObject(this._fields),
        model: this.model.modelName,
        options: sortObject(this.getOptions()),
        populatePaths: sortArray(this.getPopulatedPaths()),
    };
    return JSON.stringify(queryOptions);

}
/**
 * @param {*} obj
 * @return {*} obj
 */
function sortObject(obj) {
    return obj;
}

/**
 * @param {*} arr 
 */
function sortArray(arr) {

}

module.exports = cachePlugin;
