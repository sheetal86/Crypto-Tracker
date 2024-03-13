import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
import Header from "./components/Header";
import {Routes,Route, BrowserRouter} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/coins/:id" element={<CoinPage/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
