const client = require('./redisClient');

async function init(){
    // await client.set('user:1','John Doe');
    // await client.expire('user:1', 10);
    const result = await client.get('user:1');
    console.log('Result->',result);
}
init();