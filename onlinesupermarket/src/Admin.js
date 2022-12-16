import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {

    var uri = 'http://localhost:1100/'

    var navi = useNavigate()

    function login(e) {
        e.preventDefault()
        var d = new FormData(e.currentTarget);
        var email = d.get('email')
        var password = d.get('password')

        console.log(email + password)

        //admin@gmail.com
        // 123456
        var udata = { Email: email, Password: password }
        axios.post(uri + 'getadmin', udata).then((succ) => {
            if (succ.data.Email != email) {
                alert('wrong email')
            } else if (succ.data.Password != password) {
                alert('wrong password')
            } else {
                alert('login successful')
                localStorage.setItem("AdminEm", succ.data.Email)
                navi("/AllProducts")
            }
        })
    }

    return (
        <>
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <div className="col-md-4">
                    <h1 className="f-fmly">Login</h1>
                    <form onSubmit={login}>
                        <div className="form-group">
                            <input className="form-control" placeholder="enter email" name="email" type={'email'} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="enter password" name="password" type={'text'} />
                        </div>
                        <div className="form-group">
                            <input className="btn btn-block" type={'submit'} value={'login'} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
