import React from 'react';

export default class TextField extends React.Component {
  // constructor(props) {
  //   super(props);
  //   let input_text = '';
  //   if(props.value){
  //     input_text = props.value;
  //   }
  //
  //   this.state = {
  //     input_text: input_text,
  //     error: 'el campo no puede estar vacio.'
  //   }
  //
  //   this.handleChange = this.handleChange.bind(this);
  // }

  /*
  handleChange(event) {
    let error = null;
    if(event.target.value.length > 10) {
      error = 'La longitud del campo debe de ser menor de 10.'
    } else if(event.target.value.length <= 0) {
      error = 'el campo no puede estar vacio.'
    }
    this.setState({input_text: event.target.value, 'error': error});
  }*/

  render() {
    return (
      <div className="form-group" >
        <label>{this.props.name}</label>
        <input type="text" value={this.props.value} onChange={(event) => this.props.handleChange(event)}/>
      </div>
    );
  }
}
