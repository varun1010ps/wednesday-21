import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

export default function requireAuth(Component) {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);
            this.shouldNavigateAway()
        }

        componentDidUpdate(prevProps, prevState) {
            this.shouldNavigateAway()
        }

        shouldNavigateAway() {
            if (!this.props.auth) {
                this.props.history.push('/');
            }
        }


        render() {
            return (
                <div>

                    <Component {...this.props} />

                </div>
            );
        }
    }
    AuthenticatedComponent.propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };

    const mapStateToProps = state => {
        return {
            auth: state.auth.authenticated
        };
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
}
