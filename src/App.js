import './App.css';
import HomePage from './components/HomePage/home';
import {  Routes, Route, useLocation} from 'react-router-dom';
import Login from './components/LoginPage/login';
import SubstationStatus from './components/SubstationStatus/substationStatus';
import Substationwisedata from './components/Substationwisedata/substationwisedata';
import SPVDashboard from './components/SPVDashboard/spvDashboard';
import SWPClearances from './components/SWPClearances/swpClearances';
import SideBar from './components/Common/Sidebar/sidebar';
import Header from './components/Common/Header/header';
import { useState } from 'react';
import ClusterSummary from './components/ClusterSummary/clusterSummary';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toogleSidebar = () =>{
    setIsSidebarOpen(!isSidebarOpen);
  }
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  
  return (
    <>
   
    <div className="App">
       {!isLoginPage && <SideBar isOpen={isSidebarOpen} />}
      {!isLoginPage && (
        <div className='headerMainContent'>
          <Header toogleSidebar={toogleSidebar} />
          <div className='full'>
            <Routes >
              <Route path="/home" element={<HomePage />} />
              <Route path='/SubstationStatus/:DIST_CODE/:augmny' element={<SubstationStatus />} />
              <Route path='/Substationwisedata/:DIST_CODE/:status' element={<Substationwisedata />} />
              <Route path='/SPVDashboard' element={<SPVDashboard />} />
              <Route path='/SWPClearances' element={<SWPClearances />} />
              <Route path='/ClusterSummary' element={<ClusterSummary />} />
            </Routes>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
