import React from 'react';

export default function About(props) {

    return (
        <div style={{textAlign: 'left'}} className='container'>
            <div className='row'>
                <div className='col'>
                    <h3>GitHub:</h3>
                    <div className='row'>
                        <a href='https://github.com/richlaconte/EndpointsFrontEnd' target='_blank'><h4>Front end repository</h4></a>
                    </div>
                    <div className='row'>
                        <a href='https://github.com/richlaconte/EndpointsBackEnd' target='_blank'><h4>Back end repository</h4></a>
                    </div>
                </div>  
            </div>
            <br></br>
            <div className='row'>
                <h2>How to use:</h2>
            </div>
            <div className='row'>
                <h4>Create a new endpoint</h4>
            </div>
            <div className='row'>
                <br></br>
                <ul>
                    <li>Create a new endpoint by clicking "create" on the home page.</li>
                    <li>Click on a created endpoint on the home page to edit it on the Endpoints page.</li>
                </ul>
                </div>
            <div className='row'>
                <h4>Edit your new endpoint</h4>
            </div>
                
            <div className='row'>
                <ul>
                    <li>New endpoints will be created with a default template that is set to POST to "https://domain.com" with an empty body.</li>
                    <li>All endpoints must return an object that has 3 properties:
                        <ol>
                            <li>url - this is the URL that the endpoint will make subsequent posts to when hit with a request as a string.</li>
                            <li>method - here you can specify whether to make a "POST" or "GET" request.</li>
                            <li>body - this is a javascript object that contains the request body to be sent to the above specified url.</li>
                        </ol>
                    </li>

                    <li>You will need to change "https://domain.com" to the URL that you would like the call created by this endpoint to POST/GET to.
                        This and any other field in the return object can be dynamic and based on data from an incoming call. For example: url: req.url,
                    </li>
                </ul>
            </div>
                
        </div>
    );
}