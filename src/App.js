import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Recents from './Components/Recents';
import Edit from './Components/Edit';
import Nav from './Components/Nav';
import uuid from 'uuid-random';

function App() {
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [ID, setID] = useState("");

  const recents = [
    {
      name: "test0",
      url: "test.com/test0",
      content: "test0 code"
    },
    {
      name: "test1",
      url: "test.com/test1",
      content: "test1 code"
    }
  ]

  let content;

  const handleSetCurrent = (index) => {
    console.log(index);
  }

  const setPage1 = () => {
    setPage(1);
  }

  const getCookie = () => {
    let cookies = document.cookie;
    if (cookies.search("ID")) {
      let ID = cookies.split("=")[1];
      if (uuid.test(ID)) {
        setID(ID);
      } else {
        createCookie();
      }
    }
  }

  const createCookie = () => {
    document.cookie = `ID=${uuid()}`;
    console.log("new cookie created.")
  }

  getCookie();

  if (page === 0) {
    content =
      <div className="App">
        <h1>Endpoints</h1>
        <div>
          <Button variant="primary" >Create</Button>
          <Recents recentItems={recents} setCurrent={setCurrent} setPage1={setPage1} />
        </div>
      </div>;
  } else if (page === 1) {
    content = <Edit recents={recents} current={current} setCurrent={setCurrent} setPage1={setPage1} />
  }

  return <div className="App">
    <Nav page={page} setPage={setPage} />
    {content}
  </div>
  
}

export default App;
