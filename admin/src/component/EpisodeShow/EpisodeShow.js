import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchEpisodes } from "../../actions/epsiode";

class EpisodeShow extends Component {
  componentDidMount() {
    this.props.fetchEpisodes();
  }

  renderAdmin(episode) {
    const iconStyles = {
      color: "black",
      fontSize: "1.5em",
      marginLeft: "10px",
    };
    return (
      <div>
        <Link to={`library-episodes/view/${episode._id}`}>
          <GrFormView style={iconStyles} />
        </Link>
        <Link to={`library-episodes/edit/${episode._id}`}>
          <BiEdit style={iconStyles} />
        </Link>
        <Link to={`library-episodes/delete/${episode._id}`}>
          <AiOutlineDelete style={iconStyles} />
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.episodes.map((episode) => {
      return (
        <div className="card" key={episode._id}>
          <div className="content negative">
            <div className="header">
              {episode.title}
              <span className="ui big right floated">
                {this.renderAdmin(episode)}
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
        <h1 className="content-text">ALL Episode</h1>
        <div className="ui cards">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    episodes: Object.values(state.episode),
  };
};

export default connect(mapStateToProps, { fetchEpisodes })(EpisodeShow);
