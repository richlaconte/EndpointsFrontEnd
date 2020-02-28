import React from 'react';

export default function RecentItem(props) {
  
    const setCurrentHandler = () => {
        console.log(props.index)
        props.setCurrent(props.index);
        props.setPage1();
        if (props.updateCode) {
            props.updateCode(props.content);
        }
    }
  
    return (
    <div className="row recentItem" onClick={setCurrentHandler}>
        {props.name}
    </div>
  );
}