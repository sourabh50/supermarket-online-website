import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Unavbar from "./Unavbar";

export default function Items() {

// ------------------
    const [search, setSearch] = useState('');
      
      
      
    const [searchData, setSearchData] = useState([]);
  
// --------

    var uri = 'http://localhost:1100/'

    var fname = localStorage.getItem('FType')

    var user = localStorage.getItem('UserEm');

    const [uEM, setuEM] = useState('')
    function getuser() {
        var data1 = { Email: user }
        if (user) {
            axios.post(uri + 'getusr', data1).then((succ) => {
                // console.log(succ.data)
                setuEM(succ.data.Email)
            })
        }
    }
    useEffect(() => {
        getuser()
    }, [user])

    const [data, setdata] = useState([])
    function getfood() {
        var srch = { ftype: fname };
        axios.post(uri + "getfood", srch).then((succ) => {
            setdata(succ.data)
        })
    }

    // console.log(data)
    useEffect(() => {
        getfood()
    }, [fname])


    useEffect(() => {
        if (search) {
          const newData = data.filter(item => {
            const itemData = item.fname
              ? item.fname.toUpperCase()
              : ''.toUpperCase();
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
        
          });
          setSearchData(newData);
          console.log(newData);
        } else {
          setSearchData([]);
          console.log('no data');
        }
      }, [search]);




    function addcart(x) {
        // console.log(x)

        if(user){
            var obj = { User: uEM }
            var obj2 = {Pid:x._id,Fname:x.fname,Ftype:x.ftype,Fveg:x.fveg,Fprc:x.fprc,Fimg:x.fimg,Fqty:1}
            var data1 = Object.assign(obj,obj2)
    
            console.log(data1)
    
            axios.post(uri + "getcart", { em: user }).then((succ) => {
                console.log(succ.data)
                if (succ.data != '') {
                    var ar = succ.data;
    
                    for (var i = 0; i < ar.length; i++) {
                        if (ar[i].Pid === data1.Pid) {
                            console.log("pro hai")
                            alert("already added")
                            return false
                        }
                    }
    
                    for (var count = 0; count < ar.length; count++) {
                        if (ar[count].Pid !== data1.Pid) {
                            console.log("pro nhi hai")
                            axios.post(uri + "mycart", data1).then((succ) => {
                                if (succ.data === "success") {
                                    alert("data added to cart")
                                } else {
                                    alert("can't add data")
                                }
                            })
                            return true;
                        }
                    }
    
                } else {
                    console.log(succ.data)
                    console.log("cart nhi hai")
                    axios.post(uri + "mycart", data1).then((succ) => {
                        if (succ.data === "success") {
                            alert("data added to cart")
                        } else {
                            alert("cant add data")
                        }
                    })
                }
            })
        }else{
            alert("Please Login First")
        }

    }
    return (
        <>
            <Unavbar />

          
            
            <input   onChange={(e)=>setSearch(e.target.value)}  className="ab" type="text" placeholder='Search'></input>

            <div className="container-fluid" >
                <div className="col-xs-12">
                {search ? (
                      searchData.map((v) => (
                        <div className='col-md-3 col-sm-4 col-xs-12 f-fmly' style={{ marginBottom: 30 }}>
                            <div className='' style={{ boxShadow: '0 0 3px rgba(0,0,0,.5', borderRadius: '5px', height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
                                <img src={v.fimg} className='img-responsive' style={{ height: 150, width: 180 }} />
                                <h4>{v.fname}</h4>
                                <h5>{v.fprc}</h5>
                                <button className=" btn btn-block" style={{ marginTop: '1px' }} onClick={() => addcart(v)}><span className="glyphicon glyphicon-shopping-cart"></span></button>
                            </div>
                        </div>
                    ))
                ) : (
                      data.map((v) => (
                        <div className='col-md-3 col-sm-4 col-xs-12 f-fmly' style={{ marginBottom: 30 }}>
                            <div className='' style={{ boxShadow: '0 0 3px rgba(0,0,0,.5', borderRadius: '5px', height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
                                <img src={v.fimg} className='img-responsive' style={{ height: 150, width: 180 }} />
                                <h4>{v.fname}</h4>
                                <h5>{v.fprc}</h5>
                                <button className=" btn btn-block" style={{ marginTop: '1px' }} onClick={() => addcart(v)}><span className="glyphicon glyphicon-shopping-cart"></span></button>
                            </div>
                        </div>
                    ))
                ) }
                </div>
            </div>

            <Footer/>
        </>
    )
}
