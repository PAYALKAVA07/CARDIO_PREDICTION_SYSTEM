import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Route path="/" element={<Assessment />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/result" element={<Result />} />
        <Route path="/model-info" element={<ModelInfo />} />
        <Route path="/comparison" element={<ModelComparison />} />
      </Routes>
    </BrowserRouter>
  );
}
