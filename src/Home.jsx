import React, { Component } from "react";
import { Carousel } from "antd";
import "./App.css";

class HomePage extends Component{
    render()
    {
        return(
            <div>
                <Carousel autoplay class="slick-slide">
                    <div><h1>Welcome to our bookstore!</h1></div>
                    <div><h1>In here you can find a sea of great books.</h1></div>
                    <div><h1>Pick your desired book in the catalog and check the shopping cart.</h1></div>
                    <div><h1>Help yourself and enjoy!</h1></div>
                </Carousel>
            </div>
        );
    }
}

export default HomePage;