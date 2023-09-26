import { Routes, Route, BrowserRouter } from "react-router-dom";
import InfoPage from './Pages/InfoPage/InfoPage';
import LoginPage from './Pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/info" element={<InfoPage/>} />
      </Routes> 
    </BrowserRouter>
    );
}

export default App;