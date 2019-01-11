import firebase from 'firebase';
// import Rebase from 're-base';
import {
    FIREBASE_KEY,
    FIREBASE_AUTH_DOMAIN, 
    FIREBASE_DATABASE_URL
} from 'react-native-dotenv';

const config = {
    apiKey: FIREBASE_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL
};

const app = firebase.initializeApp(config);
// const base = Rebase.createClass(app.database());

// export { base };
export default app;