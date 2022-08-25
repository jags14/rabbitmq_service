const amqp = require('amqplib/callback_api');

// connect to rabbitmq server
amqp.connect('amqp://localhost', function(error0, connection){
    if(error0){
        throw error0;
    }
    connection.createChannel(function(error1, channel){
        if(error1){
            throw error1;
        }

        const queue = 'hello';
        const message = 'Hello World RabbitMq';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent %s", message);
    })
    setTimeout(function(){
        connection.close();
        process.exit(0);
    }, 500);
});