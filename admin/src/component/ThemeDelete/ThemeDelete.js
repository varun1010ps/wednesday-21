import React, { Component }   from "react";
import { connect }            from "react-redux";
import { Link }               from "react-router-dom";

import Modal                  from "../Model/Model";
import history                from "../../history";
import { fetchTheme }        from "../../actions/theme";
import { deleteTheme }       from "../../actions/theme";

class ThemeDelete extends Component {

  componentDidMount() {
    this.props.fetchTheme(this.props.match.params.id);
  }


  renderAction() {
      const {id}=this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={()=>this.props.deleteTheme(id)} className="ui button negative">Delete</button>
        <Link to={`/admin/library-theme`} className="ui button">
          cancel
        </Link>
      </React.Fragment>
    );
  }


  renderContent() {
    if (!this.props.theme) {
      return "Are you sure you want to delete the Theme ?";
    }
    return `Are you sure you want to delete the Theme with title: ${this.props.theme.theme} ?`;
  }


  render() {
    return (
      <div>
        <Modal
          title="Delete Theme"
          content={this.renderContent()}
          actions={this.renderAction()}
          onDismiss={() => history.push("/admin/library-theme")}
        />
      </div>
    );
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.theme[ownProps.match.params.id],
  };
};


export default connect(mapStateToProps, { fetchTheme, deleteTheme })(
  ThemeDelete
);