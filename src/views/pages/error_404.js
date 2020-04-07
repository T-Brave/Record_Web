import React from 'react';
import { Row } from "antd";
class Error_404 extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        
        return (
        <div className="error_404">
            <Row gutter={16}>
                error 404
            </Row>
        </div>
        );
    }
}

export default Error_404;
