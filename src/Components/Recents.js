import React, { useState, useEffect } from 'react';
import RecentItem from './RecentItem';
import { useSelector, useDispatch } from 'react-redux';

export default function Recents(props) {
  
    //const [items, setItems] = useState(props.recentItems);

    const items = useSelector(state => state.recents);

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
  
    return (
    <div className="container">
        {items.map((item, index) => 
            <RecentItem key={index} name={item.name} content={item.content} index={index} setCurrent={handleSetCurrent} setPage1={setPage1} updateCode={updateCode} />
        )}
    </div>
  );
}