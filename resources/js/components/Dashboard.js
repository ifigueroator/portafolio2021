import React from 'react';
import ReactDOM from 'react-dom';


function Dashboard() {
    return (
        <div className="container">
          Dashboard  (ITERACION 2, MARTES 02-11-2021)
        </div>
    );
}

export default Dashboard;

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}