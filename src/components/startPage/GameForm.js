import React from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";

function GameForm(props) {
  if (props.form.selection === "") return <></>;
  else if (props.form.selection === "create")
    return (
      <form onSubmit={props.onSubmit}>
        <TextInput
          id="name"
          name="name"
          label="Name"
          onChange={props.onChange}
          value={props.form.name}
          error={props.errors.name}
        />

        <input
          type="submit"
          value="Start"
          className="btn btn-primary float-right"
        />
      </form>
    );

  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="name"
        name="name"
        label="Name"
        onChange={props.onChange}
        value={props.form.name}
        error={props.errors.name}
      />

      <TextInput
        id="room"
        name="room"
        label="Room"
        onChange={props.onChange}
        value={props.form.room}
        error={props.errors.room}
      />

      <input
        type="submit"
        value="Start"
        className="btn btn-primary float-right"
      />
    </form>
  );
}

GameForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default GameForm;
