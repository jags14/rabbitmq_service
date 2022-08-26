const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0){
        throw error0
    }
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1
        }

        const queue = 'task_queue';
        
        channel.assertQueue(queue, {
            durable: true
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(message) {
            const secs = message.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", message.content.toString());

            setTimeout(function() {
                console.log("[x] is done");
                channel.ack(message); // manually acknowledging the message 

            }, secs*1000);
        }, {
            noAck: false // we will acknowledge manually so that even if the worker dies, message is delivered by other workers & data is not lost
        });

    });
});