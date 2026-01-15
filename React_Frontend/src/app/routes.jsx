import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Assessment from "../pages/Assessment/Assessment";
import Result from "../pages/Result/Result";
import ModelInfo from "../pages/ModelInfo/ModelInfo";
import ModelComparison from "../pages/ModelComparison/ModelComparison";

import Navbar from "../components/layout/Navbar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ---------- CORE ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* ---------- APP FLOW ---------- */}
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/result" element={<Result />} />
        {/* ---------- ML EXPLANATION ---------- */}
        <Route path="/model-info" element={<ModelInfo />} />
        <Route path="/comparison" element={<ModelComparison />} />
        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
