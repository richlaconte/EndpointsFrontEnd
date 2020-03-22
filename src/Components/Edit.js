import React, { useState } from 'react';
import Recents from './Recents';
import AceEditor from "react-ace";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const axios = require('axios');

export default function Edit(props) {
    let [code, setCode] = useState("");

    let content = <div><h3>Please select an endpoint to edit.</h3></div>

    let currentCode;

    if (props.recents.length > 0 && props.current && props.recents[props.current]) {
        currentCode = props.recents[props.current].content;
    }


    const updateEndpoint = (id, code, current) => {
        console.log(id);
        console.log(props.id);
        console.log(code);
        console.log(current);

        try {
            let testCode = "let req = 0;" + currentCode;
            let value = eval(testCode);
            if (value.url && value.method && value.body) {
                axios.post('https://endpointzbackend.herokuapp.com/endpoint/update', {
                    id: props.id,
                    url: props.recents[props.current].url,
                    content: currentCode
                })
                    .then(function (response) {
                        console.log(response);
                        props.getRecents();
                        alert(`Saved successfully`);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                let url = "";
                let method = "";
                let body = "";
                if (!value.url) {
                    url = "url";
                }
                if (!value.method) {
                    method = "method";
                }
                if (!value.body) {
                    body = "body";
                }
                alert(`Your returned object is missing: ${url} ${method} ${body}`);
            }
        } catch (err) {
            alert(`Something's wrong with your code. Make sure you are calling a function that returns an object with .url, .method and .body`);
        }
    }

    const handleValueChange = (value) => {
        currentCode = value;
        try {
            let value = eval(currentCode);
            if (value.url) {
                console.log("object with URL returned");
            }

        } catch (err) {
            console.log("error");
        }

    }

    const handleSetCurrent = (index) => {
        props.setCurrent(index);
    }

    const setPage1 = () => {
        props.setPage1();
    }

    const updateCode = (value) => {
        setCode(value);
    }

    const copyUrl = () => {
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = 'https://endpointzbackend.herokuapp.com/consume/' + props.recents[props.current].url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    if (props.recents.length > 0 && props.current != null && props.recents[props.current]) {
        content =
            <div className="col-9 editMain">
                <div className="row" style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                    <div className="col-8" style={{ paddingTop: "5px" }}>
                        <h4>{props.recents[props.current].url}</h4>
                    </div>
                    <div className="col-4" style={{ textAlign: "right" }}>
                        <Button variant="success" style={{ float: "right" }} onClick={() => updateEndpoint(props.ID, currentCode, props.current)} >Save Changes</Button>
                        <DropdownButton id="dropdown-basic-button" title="Options" variant="secondary" style={{ float: "right" }}>
                            <Dropdown.Item onClick={() => { props.deleteEndpoint(props.recents[props.current].url) }}>Delete</Dropdown.Item>
                        </DropdownButton>

                    </div>
                </div>
                <div className="row" id="codeArea">
                    <div className="col-12">
                        <AceEditor
                            value={props.recents[props.current].content}
                            mode="javascript"
                            theme="github"
                            //onValueChange={value => handleValueChange(value) }
                            onChange={handleValueChange}
                            name="codeEditor"
                            editorProps={{ $blockScrolling: true }}
                            width="100%"
                            fontSize="16px"
                        />
                    </div>
                </div>
                <div className="container" id="statsArea">
                    <div className="row">
                        <div className="col-10" style={{ textAlign: "left" }}>
                            <h4>Endpoint URL:</h4>
                        </div>
                        <div className="col-2" style={{ textAlign: "right" }}>
                            <Button variant="info" style={{ textAlign: "left" }} onClick={copyUrl} >Copy</Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h5 style={{ textAlign: "left" }}>https://endpointzbackend.herokuapp.com/consume/{props.recents[props.current].url}</h5>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row" style={{ textAlign: "left" }}>
                        <div className="col-12">
                            <h4>Hits: 0</h4>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row" style={{ textAlign: "left" }}>
                        <div className="col-12">
                            <h4>Age: 0</h4>
                        </div>
                    </div>
                </div>

            </div>
    }

    return (
        <div className="edit container-fluid">
            <div className="row">
                <div className="col-3 editLeft">
                    <h3>Recent Endpoints</h3>
                    <Recents recentItems={props.recents} setCurrent={handleSetCurrent} current={props.current} setPage1={setPage1} updateCode={updateCode} />
                </div>
                {content}
            </div>
        </div>
    );
}