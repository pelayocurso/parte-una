import React from 'react';

export default class NumberField extends React.Component {

  render() {
    return (
      <div className="form-group" >
        <label>{this.props.name}</label>
        <input type="number" value={this.props.value} onChange={(event) => this.props.handleChange(event)}/>
      </div>
    );
  }
}
