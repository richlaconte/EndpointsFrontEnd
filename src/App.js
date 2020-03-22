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
  const [current, setCurrent] = useState(null);
  const [ID, setID] = useState("");
  const storeRecents = useSelector(state => state.recents);

  const counter = useSelector(state => state.counter);


  const dispatch = useDispatch();

  let content;


  const setPage1 = () => {
    setPage(1);
  }

  const getRecents = (ID) => {
    console.log(`Getting /visitor with id: ${ID}`);
    console.log(`https://endpointzbackend.herokuapp.com/visitor/${ID}`);
    axios.get('https://endpointzbackend.herokuapp.com/visitor/' + ID)
      .then(function (response) {
        console.log(response);
        console.log(response.data);

        if (response.status === 204) {
          createVisitor(createCookie());
        } else if (response.status === 200) {
          dispatch(setRecents(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const createVisitor = (id) => {
    console.log(`Posting /visitor with id: ${id}`);
    axios.post('https://endpointzbackend.herokuapp.com/visitor', {
      id: id
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const createEndpoint = () => {
    axios.post('https://endpointzbackend.herokuapp.com/endpoint', {
      id: ID,
      content: `let main = (req) => {
  return {
    url: "https://domain.com",
    method: "POST",
    body: {}
  }
}
    
main(req);`
    })
      .then(function (response) {
        console.log(response);
        getRecents(ID);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const createCookie = () => {
    let id = uuid();
    document.cookie = `ID=${id}`;
    console.log("new cookie created.")
    setID(id);
    return id;
  }

  const getCookie = () => {
    let cookies = document.cookie;
    console.log(cookies);
    if (cookies[0] === "I" && ID === "") {
      console.log("inside first if");
      let ID = cookies.split("=")[1];
      if (uuid.test(ID)) {
        console.log("inside second if");
        setID(ID);
        getRecents(ID);
      } else {
        createVisitor(createCookie());
      }
    } else if (ID === "") {
      console.log("inside else if");
      createVisitor(createCookie());
    }
  }

  getCookie();

  if (page === 0) {
    content =
      <div className="App">
        <h1>Endpoints</h1>
        <div>
          <Button variant="primary" onClick={() => createEndpoint()}>Create</Button>
          <Recents recentItems={storeRecents} setCurrent={setCurrent} current={current} setPage1={setPage1} />
        </div>
      </div>;
  } else if (page === 1) {
    content = <Edit recents={storeRecents} current={current} setCurrent={setCurrent} setPage1={setPage1} id={ID} getRecents={() => getRecents(ID)} />
  }

  return <div className="App">
    <Nav page={page} setPage={setPage} setCurrent={setCurrent} />
    {content}
  </div>

}

export default App;
