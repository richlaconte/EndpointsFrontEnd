import React from 'react';

export default function RecentItem(props) {
  
    const page0 = () => {
        props.setPage(0);
    }

    const page1 = () => {
        props.setPage(1);
    }

    const page2 = () => {
        props.setPage(2);
    }
  
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" href="#" onClick={page0}>Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#endpoints" onClick={page1}>Endpoints</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={page2}>About</a>
            </li>
        </ul>
  );
}