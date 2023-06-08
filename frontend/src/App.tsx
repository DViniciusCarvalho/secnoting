import Home from "./components/home/Home";
import Logon from "./components/logon/Logon";
import Login from "./components/login/Login";
import InternalPage from "./components/internal/InternalPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/logon" element={<Logon/>}/>
        <Route path= "/login" element={<Login/>}/>
        <Route path="/internal-page" element={<InternalPage/>}/>
      </Routes>
    </Router>
  );
}
