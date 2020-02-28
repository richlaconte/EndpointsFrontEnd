import React from 'react';
import RecentItem from './RecentItem';

export default function Recents(props) {
  
    const handleSetCurrent = (index) => {
        props.setCurrent(index);
    }

    const updateCode = (value) => {
        if (props.updateCode) {
            props.updateCode(value);
        }
    }

    const setPage1 = () => {
        props.setPage1();
    }

    const recentItems = props.recentItems.map((item, index) => 
        <RecentItem key={index} name={item.name} content={item.content} index={index} setCurrent={handleSetCurrent} setPage1={setPage1} updateCode={updateCode} />
    )
  
    return (
    <div className="container">
        {recentItems}
    </div>
  );
}