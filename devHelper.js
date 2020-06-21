const mongoose = require('mongoose');
const cachePlugin = require('./index');
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
UserSchema.plugin(cachePlugin);
const User = mongoose.model('User', UserSchema);
/**
 * @param {bool} insertAgain
 */
async function initialize(insertAgain) {
    mongoose.connect(process.env.mongodb_uri);
    if (insertAgain) {
        await User.insertMany([{
            name: 'Arihant',
            age: 20,
        },
        {
            name: 'Rahul',
            age: 22,
        },
        ]);
    }
}
/**
 */
async function findFirst() {
    return await User.find({}).select({name: 1})
        .sort({name: -1}).limit(2).exec();
}

/**
 */
async function findAgain() {
    return await User.find({}).select({name: 1})
        .sort({name: -1}).limit(2).exec();
}

/** */
async function main() {
    await initialize(false);
    let results = await findFirst();
    results = await findAgain();
    console.log(results);
}

main();
