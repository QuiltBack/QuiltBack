import React, { Component } from 'react';
 const frontenv = require('../../frontenv.js');

class Login extends Component {

    render() {
        return (
            <div>
                <a href={`${frontenv.BACKEND_HOST}/auth`}><p>Login</p></a>
            </div>
        )
    }

}

export default Login;