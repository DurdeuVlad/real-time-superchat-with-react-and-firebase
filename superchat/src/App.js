import logo from './logo.svg';
import './App.css';

import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, query, orderBy, limit, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import * as PropTypes from "prop-types";
import {useState} from "react";

// Firebase configuration object
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header className="App-header">
                {user ? <SignOut/> : null} {/* Show SignOut button when user is authenticated */}
            </header>
            <section>
                {user ? <ChatRoom/> : <SignIn/>}
            </section>
        </div>
    );
}


function ChatMessage(props) {
    const {text, uid, photoURL} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
  )
}

ChatMessage.propTypes = {message: PropTypes.any};

function ChatRoom() {
    const firestore = getFirestore(); // Get the Firestore instance

    // Reference to the 'messages' collection
    const messagesRef = collection(firestore, "messages");

    // Create a query to order messages by 'createdAt' and limit to 25
    const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));

    // Use useCollectionData hook to fetch messages data
    const [messages] = useCollectionData(messagesQuery);

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const { uid, photoURL } = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: new Date().toISOString(),
            uid,
            photoURL
        });

        setFormValue(''); // Clear the form after sending the message
    };

    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <form onSubmit={sendMessage}> {/* Call sendMessage when the form is submitted */}
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}


function SignIn() {
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (<button onClick={signInWithGoogle}>Sign in!</button>);
}

function SignOut(){
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth);
    };

    return auth.currentUser && (<button onClick={handleSignOut}>Sign out</button>);
}


export default App;
