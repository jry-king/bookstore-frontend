import React, { Component } from 'react';
import { Layout, Button } from "antd";

class BookPage extends Component{
    handleClick = (e) => {
        alert(this.props.bookid);
    }
    render()
    {
        return(
            <Button type="primary" onClick={this.handleClick}>test</Button>
        );
    }
}

export default BookPage;