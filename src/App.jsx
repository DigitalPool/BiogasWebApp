import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import GasDetail from "./app/GasDetail";


function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gas/:type" element={<GasDetail />} />
            </Routes>
        </Router>
    );
}

export default App;