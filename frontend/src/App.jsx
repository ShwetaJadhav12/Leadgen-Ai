import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Leads from "./pages/Leads";
import Campaigns from "./pages/Campaigns";
import Outreach from "./pages/Outreach";

import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/leads"
          element={<Leads />}

        />
        <Route
          path="/campaigns"
          element={<Campaigns />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/assistant"
          element={<Assistant />}
        />
        <Route
          path="/outreach"
          element={<Outreach />}
        />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;