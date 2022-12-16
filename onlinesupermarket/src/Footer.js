import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import axios from "axios";
import React from "react";

export default function Footer() {


    var uri = 'http://localhost:1100/'

    function sndfeedback(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var em = d.get('em')
        var nm = d.get('nm')
        var cot = d.get('cot')
        var msg = d.get('msg')

        console.log(em + nm + cot + msg)
        var alpha = /[A-Z a-z,'&.+]/
        var abc = []

        var num = /[0-9]/
        var abc2 = []

        for (var i = 0; i < cot.length; i++) {
            if (!num.test(cot[i])) {
                abc2.push(cot[i])
                e.target.cot.focus()
            }
        }


        for (var i = 0; i < nm.length; i++) {
            if (!alpha.test(nm[i])) {
                abc.push(nm[i])
                e.target.nm.focus()
            }
        }

        if(abc!=''){
            alert("Use alphabets only")
        }else if(abc2!=""){
            alert("User numbers only")
        }else{
            var obj = {Name:nm,Contact:cot,Email:em,Message:msg}
            axios.post(uri+"sndfback",obj).then((succ)=>{
                alert(succ.data)
                e.target.reset();
            })
        }
    }
    return (
        <>
            <footer>
                <div className="">
                    <div className="col-xs-12 bg7" style={{ paddingBottom: 20 ,backgroundColor: 'black',color:'white' }}>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <h3 className="f-fmly" style={{ margin: '40px 0' }}>About Us</h3>
                            <div className="f-fmly">
                                <p>The best online grocery store.It is an online supermarket for all your daily needs. 
                                    <br /><br />
                                    In this online supermarket all daily needs are avaliable and at reasonable price.The quality of product is good.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <h3 className="f-fmly" style={{ margin: '40px 0' }}>Send Feedback</h3>
                            <form onSubmit={sndfeedback}>
                                <div className="form-group">
                                    <input type={'text'} name='nm' className="form-control" placeholder="enter your name" />
                                </div>
                                <div className="form-group">
                                    <input type={'text'} name="cot" className="form-control" placeholder="enter your contact" />
                                </div>
                                <div className="form-group">
                                    <input type={'email'} name="em" className="form-control" placeholder="enter your email" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="enter your message" name="msg" rows={1} style={{ resize: 'none' }}></textarea>
                                </div>
                                <button className="btn btn-block btn-sm" type="submit" style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>Submit</button>
                            </form>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <h3 className="f-fmly" style={{ margin: '40px 0' }}>Contact Us</h3>
                            <h5 className="f-fmly">Phone No:98765XXXX</h5>
                            <ul className="contact-us" style={{ padding: 0 }}>
                                <li><a href=""><Instagram style={{ fontSize: 30, color: 'gray' }} /></a></li>
                                <li><a href=""><Facebook style={{ fontSize: 30, color: 'gray' }} /></a></li>
                                <li><a href=""><Twitter style={{ fontSize: 30, color: 'gray' }} /></a></li>
                                <li><a href=""><YouTube style={{ fontSize: 30, color: 'gray' }} /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

