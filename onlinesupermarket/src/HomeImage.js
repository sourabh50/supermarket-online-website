import React from 'react'
// import { Carousel } from 'react-bootstrap'


export default function HomeImage() {
    return (
        <div>
            <div class="cont" style={{marginTop:-20}}>
                {/* <h2>Carousel Example</h2>   */}
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    {/* ------- */}
                    {/* <div class="form-group">    
        <div class="container">
            <div class="row">
            <div class="col-md-6" >
                <input type="text" class="form-control input-lg" placeholder="Search the product" />  
            </div>
            <div class="col-md-2" >
                <a class="btn btn-lg btn-success" href="#" role="button">GO</a>
            </div>
            </div>
        </div>
    </div> */}
                    {/* <!-- Indicators --> */}
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner">
                        <div className="item active">
                        <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="" style={{width:'100%', height:'80vh'}} />
                        </div>

                        <div className="item">
                        <img src="https://cdn.pixabay.com/photo/2019/03/13/11/07/supermarket-4052658_960_720.jpg" alt="" style={{width:'100%', height:'80vh'}} />

                        </div>

                        <div className="item">
                        <img src="https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" style={{width:'100%', height:'80vh'}} />

                        </div>
                    </div>

                    {/* <!-- Left and right controls --> */}
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>


        </div>
    )
}