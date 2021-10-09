import React, { Component } from 'react';
import requireAuth from '../RequireAuth/RequireAuth';

class Dashboard extends Component {
    state = {}
    render() {
        return (<div>
            <div className="container justify-content-center">
                <div className="admin_text_box">
                    <h1 className="d-flex justify-content-start admin_text">Dashboard</h1>
                </div>
            </div>
        </div>);
    }
}

export default requireAuth(Dashboard);