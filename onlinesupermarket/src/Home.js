// import axios from 'axios'
import React, { cloneElement } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Unavbar from './Unavbar'
import HomeImage from './HomeImage';

export default function Home() {

    var navi = useNavigate()

    const menu = [{ Img: 'https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', Name: "foodgrains, oil & masala" },
    { Img: 'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80', Name: 'bakery, cakes & dairy' },
    { Img: 'https://images.unsplash.com/photo-1625865019845-7b2c89b8a8a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', Name: 'beverages' },
    { Img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80', Name: 'fruits & vegetables' },
    { Img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25hY2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', Name: 'snacks & branded foods' },
    { Img: 'https://www.cosmeticsdesign-asia.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/cosmetics/cosmeticsdesign-asia.com/article/2021/04/20/the-new-normal-how-lifebuoy-and-lux-are-embracing-unilever-s-positive-beauty-vision/12363108-1-eng-GB/The-new-normal-How-Lifebuoy-and-Lux-are-embracing-Unilever-s-Positive-Beauty-vision.jpg', Name: 'beauty & hygiene' },
    { Img: 'https://thumbs.dreamstime.com/b/nicosia-cyprus-june-supermarket-display-different-brands-household-cleaning-products-variety-household-cleaning-206802763.jpg', Name: 'cleaning & household' },
    { Img: 'https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-01/clean-bowls31.jpg', Name: 'kitchen, garden & pets' },]


    function getcat(x) {
        console.log(x.Name)
        localStorage.setItem('FType', x.Name)
        navi("/Items")
    }
    return (
        <>

            <Unavbar />
            <HomeImage />
            {/* <div className="bg1">
                <div className='container' style={{ marginBottom: 30 }}>
                    <div className="d-flex-center f-fmly">
                        <h1 className='white'>Welcome To Supermarket </h1>
                    </div>
                </div>
                </div> */}
          

            <div className='bg3'>
                <div className='container-fluid'>
                    <div className='col-xs-12'>
                        <h2 className='f-fmly text-center' style={{ margin: '40px 0' }}>Choose Category To Buy</h2>
                        {menu.map((v) => (
                            <div className='col-md-3 col-sm-4 col-xs-12 f-fmly bg6' style={{ marginBottom: 30, cursor: 'pointer' }} onClick={() => getcat(v)}>
                                <div className='' style={{ boxShadow: '0 0 3px rgba(0,0,0,.5', borderRadius: '5px', height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
                                    <img src={v.Img} className='img-responsive' style={{ height: 100, width: 180 }} />
                                    <h3>{v.Name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* <div class="wrap">
                <div class="typing" style={{ margin: '40px 0' }}>
                    Welcome To Store   
                </div>
            </div> */}
            <Footer />
        </>
    )
}