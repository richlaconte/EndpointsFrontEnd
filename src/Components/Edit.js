import React, { useState } from 'react';
import Recents from './Recents';
import AceEditor from "react-ace";
import Button from 'react-bootstrap/Button';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const axios = require('axios');

export default function Edit(props) {
    let [code, setCode] = useState("");

    let content = <div><h3>Please select an endpoint to edit.</h3></div>

    let currentCode;

    if (props.recents.length > 0) {
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

    if (props.recents.length > 0) {
        content =
            <div className="col-9 editMain">
                <div className="row">
                    <div className="col-6">
                        <h3 style={{ textAlign: "left" }}>URL: {props.recents[props.current].url}</h3>
                    </div>
                    <div className="col-6">
                        <Button variant="success" style={{ float: "right", textAlign: "right" }} onClick={() => updateEndpoint(props.ID, currentCode, props.current)} >Save</Button>
                    </div>
                </div>
                <div className="row">
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
            </div>
    }

    return (
        <div className="edit container-fluid">
            <div className="row">
                <div className="col-3 editLeft">
                    <h3>Recent Endpoints</h3>
                    <Recents recentItems={props.recents} setCurrent={handleSetCurrent} setPage1={setPage1} updateCode={updateCode} />
                </div>
                {content}
            </div>
        </div>
    );
}