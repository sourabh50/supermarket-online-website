import React, { useState } from 'react';
import axios from 'axios';
import { storage } from './firebase';
import Anavbar from './Anavbar';

export default function AddProduct() {

    var uri = 'http://localhost:1100/'
    const menu = [{ Name: "foodgrains, oil & masala" },
    { Name: 'BAKERY, CAKES & DAIRY' },
    { Name: 'BEVERAGES' },
    { Name: 'FRUITS & VEGETABLES' },
    { Name: 'SNACKS & BRANDED FOODS' },
    { Name: 'BEAUTY & HYGIENE' },
    { Name: 'cleaning & household' },
    { Name: 'KITCHEN, GARDEN & PETS' },]

    const [prog, setprog] = useState(0)
    function addf(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var fimg = d.get("fimg");
        var fname = d.get("fname").toLowerCase();
        var ftype = d.get("ftype").toLowerCase();
        // var fveg = d.get("fveg").toLowerCase();
        var fprc = Number(d.get("fprc"));

        console.log(fname)
        console.log(fprc)
        console.log(ftype)
        console.log(fimg)
        // console.log(fveg)

        setprog(1)
        var str = storage.ref("/images/" + fimg.name).put(fimg)
        str.then((succ) => {
            str.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url)
                var obj1 = {
                    fname: fname,
                    ftype: ftype,
                    // fveg: fveg,
                    fimg: url,
                    fprc: fprc,
                }

                axios.post(uri + "addpro", obj1).then((succ) => {
                    alert(succ.data)
                    setprog(0)
                    e.target.reset()
                })
            })
        })

    }
    return (
        <>
            <Anavbar/>
            <div className='container'>
                <div className='col-md-10 bg4'>
                    <div className='col-md-6 col-sm-8 col-xs-12'>
                        <br />
                        <form encType='multipart/form-data' onSubmit={addf}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="fname" placeholder="Enter Product Name" autoComplete='off' />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="fprc" placeholder="Enter Product Price" />
                            </div>
                            <div className='form-group'>
                                <select className='form-control' name="ftype">
                                    {menu.map((v) => (
                                        <option value={v.Name} style={{textTransform:"capitalize"}}>{v.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="file" className="form-control" name="fimg" accept='image/*' />
                            </div>
                            {/* <div className='form-group'>
                                <select className='form-control' name='fveg'>
                                    <option value={'veg'}>veg</option>
                                    <option value={'nonveg'}>nonveg</option>
                                </select>
                            </div> */}

                            {prog == 0 ? (
                                <div className="form-group">
                                    <button type="submit" className="btn btn-default">Add Product</button>
                                </div>
                            ) : (
                                <>Adding Product</>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
