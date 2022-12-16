import axios from "axios";
import React, { useEffect, useState } from "react";
import Anavbar from "./Anavbar";
import { storage } from "./firebase";

export default function AllPro() {

    var uri = 'http://localhost:1100/'

    const menu = [{ Name: "Food grains & oil masala" },
    { Name: 'BAKERY, CAKES & DAIRY' },
    { Name: 'BEVERAGES' },
    { Name: 'FRUITS & VEGETABLES' },
    { Name: 'SNACKS & BRANDED FOODS' },
    { Name: 'BEAUTY & HYGIENE' },
    { Name: 'CLEANING & HOUSEHOLD' },
    { Name: 'KITCHEN, GARDEN & PETS' },]
    

    const [data, setdata] = useState([])

    const [type1, settype1] = useState('')
    console.log(type1)

    function getfood() {
        var obj1 = { type1: type1 }
        axios.post(uri + "getallfood", obj1).then((succ) => {
            setdata(succ.data)
        })
    }
    useEffect(() => {
        getfood()
    }, [type1])


    function del1(x) {
        var id = { id: x }
        if (window.confirm('sure to delete product')) {
            axios.post(uri + 'delpro', id).then((succ) => {
                alert(succ.data)
                getfood()
            })
        }
    }

    const [nm, setnm] = useState('')
    const [ty, setty] = useState('')
    const [pr, setpr] = useState('')
    const [vg, setvg] = useState('')

    function edit(x) {
        console.log(x)
        var id = { id: x }
        axios.post(uri + 'getonepro', id).then((succ) => {
            console.log(succ.data)
            setnm(succ.data.fname)
            setty(succ.data.ftype)
            setpr(succ.data.fprc)
            setvg(succ.data.fveg)
        })
    }

    const[prog,setprog] = useState(0)
    function editf(e){
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var fimg = d.get("fimg");

        setprog(1)
        var str = storage.ref("/images/" + fimg.name).put(fimg)
        str.then((succ) => {
            str.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url)
                var obj1 = {
                    fname: nm.toLowerCase(),
                    ftype: ty.toLowerCase(),
                    fveg: vg.toLowerCase(),
                    fimg: url,
                    fprc: Number(pr),
                }

                // console.log(obj1)
                axios.post(uri + "editpro", obj1).then((succ) => {
                    alert(succ.data)
                    setprog(0)
                    e.target.reset()
                    getfood()
                })
            })
        })
    }
    return (
        <>
            <Anavbar />
            <div className="col-md-10 bg4">
                <div className="col-md-5">
                    <select className='form-control' name="ftype" onChange={(e) => settype1(e.target.value)}>
                        {menu.map((v) => (
                            <option value={v.Name} style={{ textTransform: "capitalize" }}>{v.Name}</option>
                        ))}
                    </select>
                </div>
                <div className="clearfix"></div>
                <br />
                {data.map((v) => (
                    <div className='col-lg-3 col-md-4 col-sm-4 col-xs-6 f-fmly' style={{ marginBottom: 30, cursor: 'pointer' }}>
                        <div className='' style={{ boxShadow: '0 0 3px rgba(0,0,0,.5', borderRadius: '5px', height: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
                            <img src={v.fimg} className='img-responsive' style={{ height: 100, width: 180 }} />
                            <h3>{v.fname}</h3>
                            <h5>{v.ftype}</h5>
                            <div className="btn-group">
                                <button className="btn btn-info" style={{ border: 0 }} onClick={() => edit(v._id)} data-toggle="modal" data-target="#mymodal">edit</button>
                                <button className="btn btn-danger" style={{ border: 0 }} onClick={() => del1(v._id)}>delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div id="mymodal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Edit</h4>
                        </div>
                        <div class="modal-body">
                            <form encType='multipart/form-data' onSubmit={editf}>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={nm} onChange={(e)=>setnm(e.target.value)} name="fname" placeholder="Enter FoodItem Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={pr} onChange={(e)=>setpr(e.target.value)} name="fprc" placeholder="Enter Food Price" />
                                </div>
                                <div className='form-group'>
                                    <select className='form-control' value={ty} onChange={(e)=>setty(e.target.value)} name="ftype">
                                        {menu.map((v) => (
                                            <option value={v.Name} style={{ textTransform: "capitalize" }}>{v.Name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="file" className="form-control" required name="fimg" accept='image/*' />
                                </div>
                                <div className='form-group'>
                                    <select className='form-control' value={vg} onChange={(e)=>setnm(e.target.value)} name='fveg'>
                                        <option value={'veg'}>veg</option>
                                        <option value={'nonveg'}>nonveg</option>
                                    </select>
                                </div>

                                {prog == 0 ? (
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-default">edit FoodItem</button>
                                    </div>
                                ) : (
                                    <>Editing FoodItem</>
                                )}
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
