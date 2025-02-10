const client = require('./redisClient');

async function init(){
    await client.mset('user:1','John Doe', "user:2", "Bob", "user:3","Alice");
    await client.expire('user:1', 10);
    const result = await client.mget('user:1',"user:2","user:3","user:4");
    console.log('Result->',result);
}
init();