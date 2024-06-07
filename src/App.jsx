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
import EmplayeeRoute from './privateRoutes/EmplayeeRoute';
import HrRoute from './privateRoutes/HrRoute';
import MyEmployeeList from './pages/Hr/MyEmployeeList/MyEmployeeList';
import AddEmployee from './pages/Hr/AddEmployee/AddEmployee';
import Profile from './pages/Profile/Profile';
import Checkout from './pages/Checkout/Checkout';

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
      {pageLoading ||  (loading && !pageLoading) && <RefreshLoader />} 
       
      <div >
        <div className="main mx-auto lg:px-0">
          <Navbar />
          <div className='max-w-7xl mx-auto'>
            <Routes>
              {/* public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login pageLoading={pageLoading} loading={loading} />} />
              <Route path="/join-as-HR" element={<JoinasHr />} />
              <Route path="/join-as-employee" element={<JoinasEmployee />} />
              <Route path="/profile" element={<Profile />} />

              {/* Employee Routes */}
              <Route path="/my-assets" element={<EmplayeeRoute><MyAsset /></EmplayeeRoute>} />
              <Route path="/my-team" element={<EmplayeeRoute><MyTeam /></EmplayeeRoute>} />
              <Route path="/request-for-asset" element={<EmplayeeRoute><AssetRequest /></EmplayeeRoute>} />

              {/* Hr Routes */}
              <Route path="/asset-list" element={<HrRoute><MyAsset /></HrRoute>} />
              <Route path="/add-asset" element={<HrRoute><MyTeam /></HrRoute>} />
              <Route path="/all-request" element={<HrRoute><AssetRequest /></HrRoute>} />
              <Route path="/my-employee-list" element={<HrRoute > <MyEmployeeList />  </HrRoute>} />
              <Route path="/add-employee" element={<HrRoute > <AddEmployee /> </HrRoute>} />
              <Route path="/checkout" element={<Checkout />} />


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
