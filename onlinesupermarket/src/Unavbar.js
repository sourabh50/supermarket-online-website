import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Unavbar() {

    var uri = 'http://localhost:1100/'

    var user = localStorage.getItem('UserEm');
    // console.log(user)

    function getuser() {
        var data1 = { Email: user }
        if (user) {
            axios.post(uri + 'getusr', data1).then((succ) => {
                // console.log(succ.data)
            })
        }
    }
    useEffect(() => {
        getuser()
    }, [user])

    const [user1, setuser1] = useState(false)
    useEffect(() => {
        if (user) {
            setuser1(true)
        }
    }, [])

    // var obj2 = {Pid:x._id,Fname:x.fname,Ftype:x.ftype,Fveg:x.fveg,Fprc:x.fprc}

    const [data1, setdata1] = useState([])
    function getcart() {
        if (user) {
            axios.post(uri + "getcart", { em: user }).then((succ) => {
                setdata1(succ.data)
                // console.log(succ.data)
            })
        }
    }
    useEffect(() => {
        getcart();
    }, [user])

    function login(e) {
        e.preventDefault()
        var d = new FormData(e.currentTarget);
        var email = d.get('email')
        var password = d.get('password')

        // console.log(email + password)

        var udata = { Email: email, Password: password }
        axios.post(uri + 'getuser2', udata).then((succ) => {
            // console.log(succ.data)

            // if ((succ.data.Email == email) || (succ.data.Password == password)) {
            if ((succ.data.Password == password) || (succ.data.Email == email)) {
                // alert("data hai")
                if (succ.data.Email != email) {
                    alert('wrong email')
                } else if (succ.data.Password != password) {
                    alert('wrong password')
                } else {
                    alert('login successful')
                    localStorage.setItem("UserEm", succ.data.Email)
                    console.log("UserEm", succ.data.Email)
                    setuser1(true)
                    e.target.reset()
                }

            } else {
                axios.post(uri + 'userlogin', udata).then((succ) => {
                    localStorage.setItem("UserEm", succ.data.Email)
                    setuser1(true)
                    alert(succ.data)
                    e.target.reset()
                })
            }
        })
    }

    function logout() {
        localStorage.removeItem("UserEm");
        setuser1(false)
    }


    function incre(x) {
        console.log(x)
        axios.post(uri + "incqty", x).then((succ) => {
            console.log(succ.data)
            getcart();
        })
    }
    function decre(x) {
        console.log(x)
        axios.post(uri + "decqty", x).then((succ) => {
            console.log(succ.data)
            getcart();
        })
    }

    function del(x) {
        console.log(x)
        axios.post(uri + "delpro1", { id: x }).then((succ) => {
            if (succ.data == "deleted") {
                alert("deleted from cart")
                getcart()
            }
        })
    }

    const [tpric1, settpric1] = useState(0)
    function getprc() {
        var tp = 0;
        data1.forEach((abc) => {
            tp += abc.Fqty * abc.Fprc;
        })
        settpric1(tp)
    }

    function placeorder(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var address = d.get('address');
        if (address == "") {
            alert("enter your address")
        } else {
            var obj1 = { food: data1, total: tpric1 }
            var obj2 = { address: address }
            var order = Object.assign(obj1, obj2)

            console.log(order)

            axios.post(uri + 'placeorder1', order).then((succ) => {
                alert(succ.data)
                axios.post(uri + "delcart", { user: user }).then((succ) => {
                    console.log(succ.data)
                    getcart()
                })
            })
        }
    }
    return (
        <>
        
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">OnlineSupermarket</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
        
                            {user1 ? (
                                <>
                                    <li onClick={getcart}><a href="" data-target="#myModal2" data-toggle="modal"><span className="glyphicon glyphicon-shopping-cart"></span></a></li>
                                    <li><a href="" onClick={logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                                </>
                            ) : (
                                <>
                                    <li><a href="" data-target="#myModal" data-toggle="modal"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                                    <li><a href="" data-target="#myModal1" data-toggle="modal"><span className="glyphicon glyphicon-user"></span> Sign up</a></li>
                                </>
                            )}
                            
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Login</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <input className="form-control" placeholder="enter email" name="email" type={'email'} autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="enter password" name="password" type={'text'} autoComplete="off"  />
                                </div>
                                <div className="form-group">
                                    <input className="btn btn-block" type={'submit'} value={'login'} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------------ */}
            <div id="myModal1" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Sign Up</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <input className="form-control" placeholder="enter email" name="email" type={'email'} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="enter password" name="password" type={'text'} />
                                </div>
                                <div className="form-group">
                                    <input className="btn btn-block" type={'submit'} value={'Sign up & login'} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


        {/* ---------------------------- */}

            <div id="myModal2" className="modal fade" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Your Cart</h4>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                                {(data1 != '') ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data1.map((v) => (
                                                <tr>
                                                    <td className="td1">
                                                        <img src={v.Fimg} width={100} height={80} />
                                                    </td>
                                                    <td className="td1">{v.Fname}</td>
                                                    <td className="td1">{v.Ftype}</td>
                                                    <td className="td1">{v.Fprc * v.Fqty}</td>
                                                    <td className=" td1">
                                                        <div className="btn-group">
                                                            
                                                            {(v.Fqty == 1) ? (
                                                                <button onClick={() => del(v._id)} className="btn1 btn btn-default">
                                                                    <span className="glyphicon glyphicon-trash"></span>
                                                                    
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => decre(v)} className="btn1 btn btn-default">-</button>
                                                            )}
                                                            <button className="btn1 btn btn-default" disabled>{v.Fqty}</button>
                                                            <button onClick={() => incre(v)} className="btn1 btn btn-default">+</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <>
                                        cart is empty
                                    </>
                                )}
                            </div>
                            <hr />
                            {(data1 != '') ? (
                                <button type="button" className="btn btn-default" data-target="#myModal3" data-toggle="modal" data-dismiss="modal" onClick={getprc}>Order Now</button>
                            ) : (
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div id="myModal3" className="modal fade" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Order Now</h4>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data1.map((v) => (
                                        <tr>
                                            <td className="td1">
                                                <img src={v.Fimg} width={100} height={75} />
                                            </td>
                                            <td className="td1">{v.Fname}</td>
                                            <td className="td1">{v.Ftype}</td>
                                            {/* <td className="td1">{v.men}</td> */}
                                            <td className="td1">{v.Fprc * v.Fqty}</td>
                                            <td className="td1" >{v.Fqty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{display:'flex',justifyContent:'space-between'}} className="f-fmly">
                                        <h3>Your Total</h3>
                                        <h3>₹{tpric1}</h3>
                            </div>
                            <h3 className="f-fmly">Your Details</h3>
                            <form onSubmit={placeorder}>
                                <div className="form-group">
                                    <input className="form-control" readOnly value={user} placeholder="enter email" name="email" type={'email'} />
                                </div>
                                <div className="form-group">
                                    <textarea style={{ resize: 'none' }} name="address" className="form-control" placeholder="enter your address" type={'text'}></textarea>
                                </div>
                                <div className="form-group">
                                    <input className="btn btn-block" type={'submit'} value={'place order'} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        

        </>
    )
}