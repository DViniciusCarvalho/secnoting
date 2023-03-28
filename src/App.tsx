import FirstPage from "./components/first_page_component/FirstPage";
import Logon from "./components/logon_page_components/Logon";
import Login from "./components/login_page_components/Login";
import InternalPage from "./components/internal_page_components/InternalPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage/>}/>
        <Route path="/logon" element={<Logon/>}/>
        <Route path= "/login" element={<Login/>}/>
        <Route path="/internal-page" element={<InternalPage/>}/>
      </Routes>
    </Router>
  );
}
