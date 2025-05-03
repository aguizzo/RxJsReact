import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import StateWithAccessorsExample from "./pages/StateWithAccessorsExample";
import RxExamplesPage from "./pages/RxExamplesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RxExamplesPage />} />
        <Route
          path="/state-with-accessors"
          element={<StateWithAccessorsExample />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
