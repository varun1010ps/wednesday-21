import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LibraryBox from '../LibraryBox/LibraryBox';
import requireAuth from '../RequireAuth/RequireAuth';

class Content extends Component {
    state = {}
    render() {
        return (<div className="Content">
            <div className="container justify-content-center">
                <div className="admin_text_box">
                    <h1 className="d-flex justify-content-start admin_text">Content</h1>
                    <h1 className="d-flex justify-content-start content-text">Customize User Library</h1>
                </div>
                <div className="row justify-content-start ml-5">
                    <Link to='/admin/library-episodes'>
                        <LibraryBox Text="Episode" BackColor='#699447' Color='#699447' />
                    </Link>
                    <Link to='/admin/library-topics'>
                        <LibraryBox Text="Topics" BackColor='#2C9EDE' Color='#2C9EDE' />
                    </Link>
                    <Link to='/admin/library-theme'>
                        <LibraryBox Text="Theme" BackColor="#FF5F5F" Color="#FF5F5F" />
                    </Link>
                    <Link to='/admin/library-stories'>
                        <LibraryBox Text="Stories" BackColor='#199447' Color='#199447' />
                    </Link>
                    <Link to='/admin/library-sessionBeta'>
                        <LibraryBox Text="SessionBeta" BackColor='#919447' Color='#919447' />
                    </Link>
                </div>
                <div className="admin_text_box">
                    <h1 className="d-flex justify-content-start content-text">Community</h1>
                </div>
                <div className="row justify-content-start ml-5">
                    <Link to='/admin/community-topics'>
                        <LibraryBox Text="Topics" BackColor='#F4A100' Color='#F4A100' />
                    </Link>
                </div>
                <div className="admin_text_box">
                    <h1 className="d-flex justify-content-start content-text">Others</h1>
                </div>
                <div className="row justify-content-start ml-5">
                    <Link to='/admin/library-journalquestion'>
                        <LibraryBox Text="Journal Questions" BackColor='#C4A100' Color='#C4A100' />
                    </Link>
                </div>
            </div>
        </div>);
    }
}

export default requireAuth(Content);