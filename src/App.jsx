
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home/Home'
import Navbar from './shared/Navbar/Navbar'
import ErrorPage from './utility/ErrorPage/ErrorPage';
import Login from './pages/Login/Login';


function App() {

  return (
    <BrowserRouter>
    <Toaster />
     <div className='bg-white '>
     <div className="main mx-auto lg:px-0">
      <Navbar />
       <div>
       <Routes>
        {/* public routes */}
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />



        {/* private routes */}






         <Route path="*" element={<ErrorPage message={"The following route is not found"} />} />
       </Routes>
       </div>
     </div>
     
     </div>
   </BrowserRouter>
  )
}

export default App
