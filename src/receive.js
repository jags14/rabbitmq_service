const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost/', function(error0, connection){
    if(error0){
        throw error0
    }
    connection.createChannel(function(error1, channel){
        if(error1){
            throw error1
        }
         const queue = 'hello';

         channel.assertQueue(queue, {
            durable: false
         });
         console.log(" [*] waiting for messages in %s. To exit press CTRL+C", queue)
         channel.consume(queue, function(message){
            console.log("[x] Received %s", message.content.toString());
         }, {
            noAck: true
         });
    });
});