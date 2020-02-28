import React, {useState} from 'react';
import Recents from './Recents';
import AceEditor from "react-ace";
import Button from 'react-bootstrap/Button';
 
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

export default function Edit(props) {
    let [code, setCode] = useState(props.recents[props.current].content);

    const handleSetCurrent = (index) => {
        props.setCurrent(index);
    }

    const setPage1 = () => {
        props.setPage1();
    }

    const updateCode = (value) => {
        setCode(value);
    }

    return (
    <div className="edit container-fluid">
        <div className="row">
            <div className="col-3 editLeft">
                <h3>Recent Endpoints</h3>
                <Recents recentItems={props.recents} setCurrent={handleSetCurrent} setPage1={setPage1} updateCode={updateCode} />
            </div>
            <div className="col-9 editMain">
                <div className="row">
                    <div className="col-6">
                        <h3 style={{textAlign: "left"}}>URL</h3>
                    </div>
                    <div className="col-6">
                        <Button variant="success" style={{ float: "right", textAlign: "right" }}>Save</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <AceEditor
                            value={code}
                            placeholder={props.recents.content}
                            mode="javascript"
                            theme="github"
                            onValueChange={code => setCode(code)}
                            name="codeEditor"
                            editorProps={{ $blockScrolling: true }}
                            width="100%"
                            fontSize="16px"
                        />
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
}