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

    let content = <div></div>;

    console.log(items)
    console.log(items.length)

    if (items.length > 0) {
        content = items.map((item, index) =>
            <RecentItem key={index} name={item.url} content={item.content} index={index}
                setCurrent={handleSetCurrent} current={props.current} setPage1={setPage1}
                updateCode={updateCode} />
        )
    }

    return (
        <div className="container" style={{ maxHeight: "750px", overflow: "auto" }}>
            {content}
        </div>
    );
}