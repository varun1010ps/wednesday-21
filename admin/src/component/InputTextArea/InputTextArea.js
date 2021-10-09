import React from 'react';
import './InputTextArea.css';

const InputTextArea = ({ input, label, meta: { error, touched } }) => {
    return (
        <div className="InputField">
          <label className="input_label">{label}</label>
          <br/>
          <textarea className="input-text-area" {...input} autoComplete="off" style={{ marginBottom: '5px' }} />
          <div className="red-text" style={{ marginBottom: '20px' }}>
            {touched && error}
          </div>
        </div>
      );
}
 
export default InputTextArea;


