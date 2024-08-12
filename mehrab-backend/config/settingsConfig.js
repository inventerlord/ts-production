"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settingsConfig = {
    jwt: {
        secret: "ndi3LD9JkXKMkwAFAe33zzWQagJAmIX4q57Wtm7cclzOoBySMH",
        refresh_secret: "xJ8debrJkVrvXZp4jwesW0gCdeQstAMqt0e6woI3pl2yF2uqQt",
    },
    mail: {
        smtp: {
            host: 'mail.thekillcode.com',
            port: 465,
            secure: true,
            auth: {
                user: 'pavf@thekillcode.com',
                pass: 'PAVF123!@#',
            }
        }
    },
    firebaseConfig: {
        apiKey: "AIzaSyBBia3_rzd7JBpzQ7SxMyAqiQ5NS6piOtA",
        authDomain: "mern-app-cc515.firebaseapp.com",
        projectId: "mern-app-cc515",
        storageBucket: "mern-app-cc515.appspot.com",
        messagingSenderId: "474818345621",
        appId: "1:474818345621:web:e3e0797453d265f7e0f99c",
        measurementId: "G-1XKCD4JYPY"
    }
};
exports.default = settingsConfig;
