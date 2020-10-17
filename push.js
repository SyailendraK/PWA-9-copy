const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BA6QPqPV1BnjKbGiqv2um69LEcdkokhlLARFzJhSkanwZAz8ab8Ciy89pnWmQddePt1u819CsHfBHDK7WstH_6c",
    "privateKey": "9MySHFa2-zNGMebyQfw0IszuU9VXKGHTPUxLLDl6wp4"
};


webPush.setVapidDetails(
    'mailto:syailendramuhammad@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cBDciSB8ylQ:APA91bEzn3amu0DoGT67rpErFSlZwYuXT-rIx_7n9eIY9KcJwMqAJKv3YIq7V-xOQfAFRe6zh377OKGHEfq5-AmJZK1fVKcMW8Ay0esx97Z4Uuwi1IbQCNWwLNeqkZ1K82JmkM_b1Vh9",
    "keys": {
        "p256dh": "BCpdwORqA9Qlc5f4Fy7Ye+4gEsMqCz/uAF197qWBvvThl66/6oG5XwLnXBhR7P/mdQF8G1BQxnjIc5Jq99cAIH4=",
        "auth": "OATlPBM6SWHb2w1ILMwkJA=="
    }
};
const payload = 'Hallo, selamat menikmati BolaMania';

const options = {
    gcmAPIKey: '1548327288',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);