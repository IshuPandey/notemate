import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import {useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


function App() {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);

        }, 3000)

    }

    return (
        <>
            <NoteState>

                <Router>
                    <Navbar/>

                    <Alert alert={alert}/>
                    <Routes>

                        <Route exact path="/home" element={<Home showAlert={showAlert}/>}/>
                        <Route exact path="/about" element={<About/>}/>
                        <Route exact path="/" element={<Login showAlert={showAlert}/>}/>
                        <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
                        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
                    </Routes>


                </Router>

            </NoteState>

        </>
    );
}

export default App;
