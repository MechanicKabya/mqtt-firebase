const mqtt = require('mqtt');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mycuetbus-default-rtdb.firebaseio.com"
});

const db = admin.database();

const client = mqtt.connect('mqtt://mqtt-dashboard.com:1883');

client.on('connect', () => {
  console.log('Connected to MQTT');
  client.subscribe('GPS_Tracking_Data');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log("Received:", data);

  db.ref("GPS_Tracker").push(data);
});
