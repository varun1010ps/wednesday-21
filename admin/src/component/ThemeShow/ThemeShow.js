import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai'
import { fetchThemes } from "../../actions/theme";


class ThemeShow extends Component {

    componentDidMount() {
        this.props.fetchThemes();
    }

    renderAdmin(theme) {
        const iconStyles = { color: "black", fontSize: "1.5em", marginLeft: "10px"};
        return (
           
            <div>
                <Link to={`library-theme/edit/${theme._id}`} >
                    <BiEdit  style={iconStyles} />
                </Link>
                <Link
                    to={`library-theme/delete/${theme._id}`}
                >
                    <AiOutlineDelete   style={iconStyles} />
                </Link>
            </div>
        );
    }

    renderList() {
        
        return this.props.themes.map((theme) => {
            return (
                <div className="card" key={theme._id}>
                    <div className="content negative">

                        <div className="header">
                            {theme.theme}
                            <span className="ui big right floated">
                                {this.renderAdmin(theme)}
                            </span>

                        </div>

                    </div>
                </div>
            );
        });
    }


    render() {
        return (
            <div className="ProjectsList">
                <h1 className="content-text">Theme</h1>
                <div className="ui cards">{this.renderList()}</div>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        themes: Object.values(state.theme),
    };
};


export default connect(mapStateToProps, { fetchThemes })(ThemeShow);