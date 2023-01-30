
import EditWorkerForm from "./views/EditWorkerForm";
import SingleWorker from "./views/SingleWorker.jsx"
import {Routes, Route} from "react-router-dom"
import {ToastContainer, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./views/HomePage.jsx";
import SingleActivity from "./views/SingleActivity";
import Navbar from "./components/Navbar";
import Login from "./views/Login"
import Register from "./views/Register"
import Today from "./views/Today"
import Workers from "./views/Workers"
import Activities from "./views/Activities"
import Bookings from "./views/Bookings"
import Notifications from "./views/Notifications"
import Roles from "./views/Roles"
import Footer from "./components/Footer"
import Dashboard from "./views/Dashboard";


function App() {
  console.log("Rendering app")


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
          <Route path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/activities/:id" element={<SingleActivity />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/today" element={<Today />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/workers/:id" element={<SingleWorker />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/edit/:id" element={<EditWorkerForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
