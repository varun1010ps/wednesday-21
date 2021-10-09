import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchStorys } from "../../actions/story";

class StoryShow extends Component {
  componentDidMount() {
    this.props.fetchStorys();
  }

  renderAdmin(story) {
    const iconStyles = {
      color: "black",
      fontSize: "1.5em",
      marginLeft: "10px",
    };
    return (
      <div>
        <Link to={`library-stories/view/${story._id}`}>
          <GrFormView style={iconStyles} />
        </Link>
        <Link to={`library-stories/edit/${story._id}`}>
          <BiEdit style={iconStyles} />
        </Link>
        <Link to={`library-stories/delete/${story._id}`}>
          <AiOutlineDelete style={iconStyles} />
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.story.map((story) => {
      console.log('story', story.message?.title)
      return (
        <div className="card" >
          <div className="content negative">
            <div className="header">
              {story.message?.title}
              <span className="ui big right floated">
                {this.renderAdmin(story)}
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
        <h1 className="content-text">ALL Stories</h1>
        <div className="ui cards">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('hello', state.stroy)
  return {
    story: Object.values(state.story),
  };
};

export default connect(mapStateToProps, { fetchStorys })(StoryShow);
