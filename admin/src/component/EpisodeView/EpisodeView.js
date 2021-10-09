import React, { Component } from "react";
import { connect } from "react-redux";
import "./EpisodeView.css";

import { fetchEpisode } from "../../actions/epsiode";

class TeamAccessView extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchEpisode(this.props.match.params.id);
  }

  render() {
    const { title, topic, description, theme1, theme2, theme3,imageUrl,audioFile} = this.props.episode;
    return (
      <div className="TeamAccessView">
        <div className="ui container">
          <div className="justify-content-md-center">
            <h1 className="admin_text_box font-weight-bold">{title}</h1>
            <p>{description}</p>
            <p>{topic}</p>
            <p>{theme1}</p>
            <p>{theme2}</p>
            <p>{theme3}</p>
            <img
              className="res"
              alt="/"
              src={
                "https://portfoilo.s3.us-east-2.amazonaws.com/" + imageUrl
              }
            />
            <audio controls>
  <source src={"https://portfoilo.s3.us-east-2.amazonaws.com/"+ audioFile}  type="audio/mpeg" />
</audio>
         </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { episode: state.episode[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchEpisode })(TeamAccessView);
