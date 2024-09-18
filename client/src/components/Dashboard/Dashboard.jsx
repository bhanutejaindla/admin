import React from 'react';
import Header from '../Header/Header.jsx';
import AdminPanel from '../AdminPanel/AdminPanel.js';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div >
      <Header adminName="Hukum Gupta" />
      <main>
        <AdminPanel />
      </main>
    </div>
  );
}

export default Dashboard;
