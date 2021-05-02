import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type={props.inputType}
          name={props.name}
          placeholder={props.label}
          onChange={props.onChange}
          className="form-control"
          value={props.value}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
      {props.hint && <small>{props.hint}</small>}
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  inputType: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
  hint: "",
  inputType: "text",
};

export default TextInput;
