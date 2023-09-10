// Lib
import { Routes, Route } from "react-router-dom";

// Toast
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Root/Navbar";

// Views
import Login from "./views/Login";
import Today from "./views/Today";
import EditWorker from "./views/EditWorker";
import EditActivity from "./views/EditActivity";
import Dashboard from "./views/Dashboard";
import Assets from "./views/Assets";

function App() {
  return (
    <div className="App h-screen flex flex-col">
      <div>
        <ToastContainer
          limit={1}
          position="top-center"
          autoClose={2500}
          hideProgressBar={true}
          closeButton={false}
          closeOnClick
          transition={Zoom}
          pauseOnFocusLoss={false}
        />
      </div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/activities/edit/:id" element={<EditActivity />} />
          <Route path="/workers/edit/:id" element={<EditWorker />} />
          <Route path="/today" element={<Today />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
