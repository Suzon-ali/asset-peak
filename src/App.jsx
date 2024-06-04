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
import MyAsset from './pages/Employee/MyAssets/MyAsset';
import MyTeam from './pages/Employee/MyTeam/MyTeam';
import AssetRequest from './pages/Employee/AssetRequest/AssetRequest';

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
      {pageLoading || loading && <RefreshLoader />} 
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

              {/* Employee Routes */}
              <Route path="/my-assets" element={<MyAsset />} />
              <Route path="/my-team" element={<MyTeam />} />
              <Route path="/request-for-asset" element={<AssetRequest />} />

              {/* Hr Routes */}
              <Route path="/asset-list" element={<MyAsset />} />
              <Route path="/add-asset" element={<MyTeam />} />
              <Route path="/all-request" element={<AssetRequest />} />
              <Route path="/custom-requests-list" element={<AssetRequest />} />
              <Route path="/my-employee-list" element={<AssetRequest />} />
              <Route path="/add-employee" element={<AssetRequest />} />


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
