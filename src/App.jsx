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
import Payment from './pages/Checkout/Payment';
import AddAsset from './pages/Hr/AddAsset/AddAsset';
import CheoutHistory from './pages/Checkout/CheoutHistory';
import AllRequest from './pages/Hr/AllRequest/AllRequest';
import AssetList from './pages/Hr/AssetList/AssetList';
import AssetPDF from './pages/Employee/MyAssets/AssetPDF';

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
              <Route path="/print" element={<AssetPDF />} />

              {/* Employee Routes */}
              <Route path="/my-assets" element={<EmplayeeRoute><MyAsset /></EmplayeeRoute>} />
              <Route path="/my-team" element={<EmplayeeRoute><MyTeam /></EmplayeeRoute>} />
              <Route path="/request-for-asset" element={<EmplayeeRoute><AssetRequest /></EmplayeeRoute>} />

              {/* Hr Routes */}
              <Route path="/asset-list" element={<HrRoute><AssetList /></HrRoute>} />
              <Route path="/add-asset" element={<HrRoute><AddAsset /></HrRoute>} />
              <Route path="/all-request" element={<HrRoute><AllRequest /></HrRoute>} />
              <Route path="/my-employee-list" element={<HrRoute > <MyEmployeeList />  </HrRoute>} />
              <Route path="/add-employee" element={<HrRoute > <AddEmployee /> </HrRoute>} />
              <Route path="/checkout" element={<Payment />} />
              <Route path="/checkout/history" element={<CheoutHistory />} />


              <Route path="*" element={<ErrorPage message={"The following route is not found"} />} />
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
