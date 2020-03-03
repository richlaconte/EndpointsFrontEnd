import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Recents from './Components/Recents';
import Edit from './Components/Edit';
import Nav from './Components/Nav';
import uuid from 'uuid-random';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './actions';
import { addRecent } from './actions/addRecent';
import { setRecents } from './actions/setRecents';

const axios = require('axios');

function App() {
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [ID, setID] = useState("");
  const storeRecents = useSelector(state => state.recents);

  const counter = useSelector(state => state.counter);


  const dispatch = useDispatch();

  let content;


  const setPage1 = () => {
    setPage(1);
  }

  const getRecents = () => {
    console.log("Getting /visitor");
    axios.get('https://https://endpointzbackend.herokuapp.com/visitor', {
      id: ID
    })
      .then(function (response) {
        console.log(`setting recents: ${response}`);
        setRecents(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const createVisitor = (id) => {
    console.log("Posting /visitor");
    axios.post('https://https://endpointzbackend.herokuapp.com/visitor', {
      id: id
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const createCookie = () => {
    let id = uuid();
    document.cookie = `ID=${id}`;
    console.log("new cookie created.")
    return id;
  }

  const getCookie = () => {
    let cookies = document.cookie;
    if (cookies.search("ID")) {
      let ID = cookies.split("=")[1];
      if (uuid.test(ID)) {
        setID(ID);
        getRecents();
      }
    } else {
      createVisitor(createCookie());
    }
  }

  getCookie();

  if (page === 0) {
    content =
      <div className="App">
        <h1>Endpoints</h1>
        <h1>{storeRecents.length}</h1>
        <h1>{counter}</h1>
        <div>
          <Button variant="primary" onClick={() => dispatch(addRecent())}>Create</Button>
          <Recents recentItems={storeRecents} setCurrent={setCurrent} setPage1={setPage1} />
        </div>
      </div>;
  } else if (page === 1) {
    content = <Edit recents={storeRecents} current={current} setCurrent={setCurrent} setPage1={setPage1} />
  }

  return <div className="App">
    <Nav page={page} setPage={setPage} />
    {content}
  </div>

}

export default App;
