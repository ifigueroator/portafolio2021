import React from 'react';
import ReactDOM from 'react-dom';


function Dashboard() {
    return (
        <div className="container">
          Dashboard  (EN CONSTRUCCION!!!!!!!! )
        </div>
    );
}

export default Dashboard;

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}