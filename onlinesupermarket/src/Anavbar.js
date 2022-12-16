import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Anavbar() {

    var ad = localStorage.getItem("AdminEm")
    const [adm, setadm] = useState(false)
    useEffect(() => {
        if (ad) {
            setadm(true)
        }
    }, [])

    var navi = useNavigate()
    function logout() {
        localStorage.removeItem("AdminEm");
        navi("/AdminHome")
    }

    return (
        <>
            <nav className="navbar navbar-inverse nav1">
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
                        <ul className="nav navbar-nav navbar-right">
                            {adm && (
                                <ul className="nav navbar-nav">
                                    <li className="nav-item"><a href="/AddProduct">Add Products</a></li>
                                    <li className="nav-item"><a href="/AllProducts">All Items</a></li>
                                    <li className="nav-item" onClick={logout}><a href="">Logout</a></li>
                                </ul>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="col-md-2 bg5" style={{ margin: 0, padding: 0 }}>
                <div>
                    <ul className="list-group">
                        <li className="list-group-item"><a href="/AddProduct">Add Products</a></li>
                        <li className="list-group-item"><a href="/AllProducts">All Items</a></li>
                        <li className="list-group-item" onClick={logout}><a href="">Logout</a></li>
                    </ul>
                </div>
            </div>


        </>
    )
}