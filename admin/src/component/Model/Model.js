import React        from "react";
import ReactDOM     from "react-dom";


const Modal = (props) => {

  const style = {
    height: "300px",
    marginLeft: "190px",
    marginTop: "150px",
  };


  return ReactDOM.createPortal(
    <div className="ui container">
      <div
        onClick={props.onDismiss}
        className="ui dimmer modals active"
      >
        <div
          style={style}
          onClick={(e) => e.stopPropagation()}
          className="ui modal active"
        >
          <div className="header">{props.title} </div>
          <div className="content" style={{ paddingBottom: "130px" }}>
            <h3>{props.content}</h3>
          </div>
          <div className="actions">
            {props.actions}
          </div>
        </div>
      </div>
    </div>,

    document.querySelector("#modal")

  );
};


export default Modal;