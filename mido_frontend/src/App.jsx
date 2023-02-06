
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
import Register from "./views/Register"
import Today from "./views/Today"
import Workers from "./views/Workers";
import EditWorker from "./views/EditWorker";
import Activities from "./views/Activities"
import EditActivity from "./views/EditActivity";
import Notes from "./views/Notes"
import Dashboard from "./views/Dashboard";


function App() {
  return (
    <div className="App h-screen overflow-hidden flex flex-col">
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
          <Route exact path="/register" element={<Register />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/edit/:id" element={<EditActivity />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/workers/edit/:id" element={<EditWorker />} />
          <Route path="/today" element={<Today />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
