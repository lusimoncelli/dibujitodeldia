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


// Function to fetch drawings for voting
function fetchDrawingsForVoting() {
    const drawingsGrid = document.getElementById('drawingsGrid');
  
    db.collection('drawings').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const drawingURL = data.drawing;
          const username = data.username;
  
          // Create drawing card
          const drawingCard = document.createElement('div');
          drawingCard.classList.add('drawing-card');
  
          // Create image element for drawing
          const drawingImg = document.createElement('img');
          drawingImg.src = drawingURL;
          drawingCard.appendChild(drawingImg);
  
          // Create username element
          const usernamePara = document.createElement('p');
          usernamePara.textContent = `subido por: ${username}`;
          drawingCard.appendChild(usernamePara);
  
          // Create like button
          const likeBtn = document.createElement('button');
          likeBtn.textContent = 'like';
          likeBtn.addEventListener('click', () => {
            // Implement like functionality
            likeDrawing(doc.id);
          });
          drawingCard.appendChild(likeBtn);
  
          // Append drawing card to grid
          drawingsGrid.appendChild(drawingCard);
        });
      })
      .catch((error) => {
        console.error('Error fetching drawings: ', error);
        // Handle error
      });
  }
  
  // Function to like a drawing
  function likeDrawing(drawingId) {
    const drawingRef = db.collection('drawings').doc(drawingId);
  
    // Use Firestore transaction to update likes count
    db.runTransaction((transaction) => {
      return transaction.get(drawingRef).then((doc) => {
        if (!doc.exists) {
          throw new Error('Drawing does not exist!');
        }
  
        // Increment likes count
        const newLikesCount = (doc.data().likes || 0) + 1;
        transaction.update(drawingRef, { likes: newLikesCount });
      });
    })
    .then(() => {
      console.log('Drawing liked successfully.');
      // Refresh drawings grid to reflect updated likes count
      fetchDrawingsForVoting();
    })
    .catch((error) => {
      console.error('Error liking drawing: ', error);
      // Handle error
    });
  }
  
  // Fetch drawings for voting when page loads
  fetchDrawingsForVoting();