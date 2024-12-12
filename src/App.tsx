import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import CardPage from "./components/CardPage";

function App() {
  useEffect(() => {
    document.title = "Hawker Tuah";
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card/:id" element={<CardPage />} />
        </Routes>
      </Router>
      <Analytics />
    </div>
  );
}

export default App;
