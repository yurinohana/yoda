const request = require('superagent');
const endpoint = 'https://api.line.me/v2/bot/message/reply';
const accessToken = 'e94mL4gfPi0oh0TnGOnzm5watG0G9YLbOUJ66eBL4RTSWp9u3UrkBfwHCFMIpZBQoVHARDJJO9qkjrLqTnqIpguVUWtbk2T20iWUT+BjKUj8Ko+mVAV/n9cEE3oKeev7IjgHa5MpPtrfmq0HX8UFugdB04t89/1O/w1cDnyilFU=';

module.exports.webhook = (event, context, callback) => {
  var body = JSON.parse(event.body);
  body.events.forEach(function(data) {
    var replyToken = data.replyToken;
    var message = data.message.text

    request.post(endpoint)
            .set('Content-type', 'application/json; charset=UTF-8')
            .set('Authorization',  'Bearer ' + accessToken)
            .send({
              replyToken: replyToken,
              messages: [
                {
                  type: 'text',
                  text: message,
                },
              ],
            })
            .end(function(error){
              if (error) {
                console.log(error);
              }
            });
  });

  callback(null, {statusCode: 200, body: JSON.stringify({})});
};
