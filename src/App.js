
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import {Alert} from './components/Alert';


function App() {
  
  return (
   <>
   <NoteState>

  <Router>
    <Navbar/>
    {/* <Alert message="Note Added" /> */}
    <Alert message="Note Added"/>
    <Routes>
      
    <Route exact  path="/" element={<Home />} />
    <Route  exact path="/about" element={<About/>} />
    <Route exact  path="/login" element={<Login />} />
    <Route exact  path="/signup" element={<Signup />} />
    </Routes>
 

  
  </Router>

   </NoteState>
   
   </>
  );
}

export default App;
