// Firebase keys
var apiKey = config.API_KEY
var authDomain = config.AUTH_DOMAIN
var projectId = config.AUTH_DOMAIN
var storageBucket = config.STORAGE_BUCKET
var messagingSenderId = config.MSG_SENDER_ID
var appId = config.APP_ID
var measurementId = config.MEASUREMENT_ID

// Initialize firebase
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to fetch historical winner drawings
function fetchHistoricalWinnerDrawings() {
    db.collection('historical').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Display historical winner drawings with word of the day and user
        });
      })
      .catch((error) => {
        console.error('Error fetching historical winner drawings: ', error);
        // Handle error
      });
  }