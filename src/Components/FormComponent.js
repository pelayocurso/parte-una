import React from 'react';
import TextField from './TextField';
import NumberField from './NumberField';

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: props.object
    };

    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeApellido = this.handleChangeApellido.bind(this);
    this.handleChangeEdad = this.handleChangeEdad.bind(this);
  }

  handleChangeNombre(event) {
    if (this.validateText(event)) {
      let object = Object.assign({}, this.state.object, {nombre: event.target.value});
      this.setState({object: object});
    }
  }
  handleChangeApellido(event) {
    if (this.validateText(event)) {
      let object = Object.assign({}, this.state.object, {apellido: event.target.value});
      this.setState({object: object});
    }
  }
  handleChangeEdad(event) {
    if (this.validateNumber(event)) {
      let object = Object.assign({}, this.state.object, {edad: event.target.value});
      this.setState({object: object});
    }
  }

  validateNumber(event) {
    if (!/^\d+$/.test(event.target.value)) {
      alert('Solo se admiten numeros');
      return false;
    }
    return true;
  }

  validateText(event) {
    if (event.target.value.length > 10) {
      alert('El campo no puedde pasar de 10 caracteres.');
      return false;
    } else if (event.target.value.length <= 0) {
      alert('El campo no puede estar vacio.');
      return false;
    } else if (!/^[a-z]+$/i.test(event.target.value)) {
      alert('El campo solo permite letras.');
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="App">
        <p>Nombre: {this.state.object.nombre}</p>
        <p>Apellido: {this.state.object.apellido}</p>
        <p>Edad: {this.state.object.edad}</p>

        <form>
          <TextField name="Nombre" value={this.state.object.nombre} handleChange={this.handleChangeNombre}/>
          <TextField name="Apellido" value={this.state.object.apellido} handleChange={this.handleChangeApellido}/>
          <NumberField name="Edad" value={this.state.object.edad} handleChange={this.handleChangeEdad}/>
        </form>
      </div>
    );
  }
}
