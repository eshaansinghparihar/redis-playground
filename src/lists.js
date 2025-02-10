const client = require('./redisClient');

async function init(){

    //Making use of List as a Queue

    await client.lpush('tasks', 'task 1');
    await client.lpush('tasks', 'task 2');
    await client.lpush('tasks', 'task 3');
    await client.lpush('tasks', 'task 4');

    const queue = await client.lrange('tasks',0,-1);

    const queuelength = await client.llen('tasks');

    console.log('Queue -> ', queue);

    for(let i = 0; i < queuelength; i++){
        const task = await client.rpop('tasks');
        console.log('Processing task Queue -> ', task);
    }

    //Making use of List as a Stack

    await client.lpush('tasks', 'task 1');
    await client.lpush('tasks', 'task 2');
    await client.lpush('tasks', 'task 3');
    await client.lpush('tasks', 'task 4');

    const stack = await client.lrange('tasks',0,-1);

    const stackLength = await client.llen('tasks');

    console.log('Stack -> ', stack);

    for(let i = 0; i < stackLength; i++){
        const task = await client.lpop('tasks');
        console.log('Processing task Stack-> ', task);
    }

    // Making use of Blocking pop

    //Tasks List is empty currently

    const item = await client.blpop('tasks', 80);
    
    // Manually add an item using lpush

    console.log('Blocking pop -> ', item);

    const list = await client.lrange('tasks',0,-1);
    
    console.log(list);

}

init();