
import SingleWorker from "./views/SingleWorker.jsx"
import {Routes, Route} from "react-router-dom"
import {ToastContainer, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./views/HomePage.jsx";
import Navbar from "./components/Root/Navbar";
import Login from "./views/Login"
import Register from "./views/Register"
import Today from "./views/Today"
import Workers from "./views/Workers";
import EditWorker from "./views/EditWorker";
import Activities from "./views/Activities"
import EditActivity from "./views/EditActivity";
import Notifications from "./views/Notifications"
import Footer from "./components/Root/Footer"
import Dashboard from "./views/Dashboard";


function App() {
  console.log("Rendering app")


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
          <Route path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/activities/edit/:id" element={<EditActivity />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/workers/edit/:id" element={<EditWorker />} />
          <Route path="/today" element={<Today />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
