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

    let className = "row recentItem";

    if (props.current === props.index) {
        className = "row currentItem";
    }

    return (
        <div className={className} onClick={setCurrentHandler}>
            {props.name}
        </div>
    );
}