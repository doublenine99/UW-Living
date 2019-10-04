import Firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDrW4nwpA9NKYux5IQU7EdSQgaFSfHjn_s",
    authDomain: "uw-living-well.firebaseapp.com",
    databaseURL: "https://uw-living-well.firebaseio.com",
    projectId: "uw-living-well",
    storageBucket: "gs://uw-living-well.appspot.com",
    messagingSenderId: "191357332442",
    appId: "1:191357332442:web:5a5e0e15b06dc1f24e2ee3",
    measurementId: "G-D0WH0KRS2C"
  };
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();