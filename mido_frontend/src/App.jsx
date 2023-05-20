
// Lib
import {Routes, Route} from "react-router-dom"

// Toast
import {ToastContainer, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Components
import Footer from "./components/Root/Footer"
import Navbar from "./components/Root/Navbar";

// Views
import Login from "./views/Login"
import Pickups from "./views/Pickups";
import Today from "./views/Today"
import Workers from "./views/Workers";
import EditWorker from "./views/EditWorker";
import Activities from "./views/Activities"
import EditActivity from "./views/EditActivity";
import Dashboard from "./views/Dashboard";


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
          <Route path="/activities" element={<Activities />} />
          <Route path="/pickups" element={<Pickups />} />
          <Route path="/activities/edit/:id" element={<EditActivity />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/workers/edit/:id" element={<EditWorker />} />
          <Route path="/today" element={<Today />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
