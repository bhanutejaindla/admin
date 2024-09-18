import React from 'react';
import Login from './components/Login/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import EmployeeList from './components/EmployeeList/EmployeeList.jsx';
import CreateEmployee from './components/CreateEmployee/CreateEmployee.jsx';


const App = () => {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList/>} />
                <Route path='/create-employee' element={<CreateEmployee/>} />
            </Routes>
        </Router>
  );
}

export default App;
