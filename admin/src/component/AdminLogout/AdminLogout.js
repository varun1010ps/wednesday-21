import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/AdminAuth'

class AdminLogOut extends Component {
  componentDidMount() {
    this.props.logout();
  }
  
  render() {
    return <div></div>;
  }
}

export default connect(null, actions)(AdminLogOut);