import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import ChallengeDetails from "./Pages/ChallengeDetails";
import EditChallenge from "./Pages/EditChallenge";
import HackathonDetail from "./Pages/HackathonDetail";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<ChallengeDetails />} />
        <Route path="/edit/:id" element={<EditChallenge />} />
        <Route path="/hackathon/:id" element={<HackathonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
