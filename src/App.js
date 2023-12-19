import React from "react";
import { Route, Routes } from "react-router-dom";
import AdmissionForm from "./Components/AdmissionForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdmissionForm />} />
    </Routes>
  );
};

export default App;
