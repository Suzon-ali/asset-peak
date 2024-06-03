import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home';
import Navbar from './shared/Navbar/Navbar';
import ErrorPage from './utility/ErrorPage/ErrorPage';
import Login from './pages/Login/Login';
import JoinasHr from './pages/JoinHr/JoinasHr';
import JoinasEmployee from './pages/JoinEmployee/JoinasEmployee';
import RefreshLoader from './utility/Loaders/RefreshLoader';
import useAuth from './hooks/useAuth';
import Footer from './shared/Footer/Footer';

function App() {
  const [pageLoading, setPageLoading] = useState(false);
  const {loading} = useAuth();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      setPageLoading(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster />
      {pageLoading || loading && <RefreshLoader />} {/* Loader component */}
      <div >
        <div className="main mx-auto lg:px-0">
          <Navbar />
          <div className='max-w-7xl mx-auto'>
            <Routes>
              {/* public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join-as-HR" element={<JoinasHr />} />
              <Route path="/join-as-employee" element={<JoinasEmployee />} />

              {/* private routes */}

              <Route path="*" element={<ErrorPage message={"The following route is not found"} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
