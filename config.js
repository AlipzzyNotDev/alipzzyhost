// Konfigurasi Firebase (Ganti dengan API Key milikmu)
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "alipzzyhost.firebaseapp.com",
    databaseURL: "https://alipzzyhost-default-rtdb.firebaseio.com",
    projectId: "alipzzyhost",
    storageBucket: "alipzzyhost.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:12345:web:abcde"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
