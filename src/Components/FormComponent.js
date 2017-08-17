import React from 'react';
//import axios from 'axios';
import TextField from './TextField';
import NumberField from './NumberField';
import Button from './Button';
import ShowNotice from './ShowNotice';

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    let object = {nombre: '', apellido: '', edad: 0};
    if(props.object) {
      object = props.object;
    }

    this.state = {
      object: object,
      last_object: object,
      notice: {
        message: '',
        isError: false
      }
    };

    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeApellido = this.handleChangeApellido.bind(this);
    this.handleChangeEdad = this.handleChangeEdad.bind(this);

    this.handleClear = this.handleClear.bind(this);
    this.handleCreateUpdate = this.handleCreateUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUndo = this.handleUndo.bind(this);

    this.showNotice = this.showNotice.bind(this);

    // this.updateData = this.updateData.bind(this);
  }

  setPersona(persona) {
    this.setState({
      object: persona,
      last_object: persona,
      notice: {
        message: '',
        isError: false
      }
    });
  }

  /* FIELD CHANGES */
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

  /* BUTTON CLICKS */
  handleClear() {
    this.clearNotice();
    this.setPersona({nombre: '', apellido: '', edad: 0});
  }
  handleUndo() {
    this.clearNotice();
    this.setState({object: this.state.last_object, last_object: this.state.last_object, notice: {message: '', isError: false}});
  }
  handleCreateUpdate() {
    this.clearNotice();
    this.props.handleUpdate(this);
    this.props.handleCreate(this);
    this.setState({object: this.state.object, last_object: this.state.object});
  }
  handleDelete() {
    this.props.handleDelete();
    this.handleClear();
  }

  /* ERROR SHOWING */
  clearNotice() {
    this.setState({object: this.state.object, last_object: this.state.last_object, notice: {message: "", isError: false}});
  }
  showNotice(message, isError) {
    let notice = Object.assign({}, this.state.notice, {message: message, isError: isError});
    this.setState({object: this.state.object, last_object: this.state.last_object, notice: notice});
  }

  /* FIELDS VALIDATION */
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

  /* RENDER */
  render() {
    //console.log(this.props);
    return (
      <div className="App">
        <ShowNotice message={this.state.notice.message} isError={this.state.notice.isError} />

        <p>Nombre: {this.state.object.nombre}</p>
        <p>Apellido: {this.state.object.apellido}</p>
        <p>Edad: {this.state.object.edad}</p>

        <TextField name="Nombre" value={this.state.object.nombre} handleChange={this.handleChangeNombre}/>
        <TextField name="Apellido" value={this.state.object.apellido} handleChange={this.handleChangeApellido}/>
        <NumberField name="Edad" value={this.state.object.edad} handleChange={this.handleChangeEdad}/>

        <Button name="Deshacer Cambios" handleClick={this.handleUndo} />
        <Button name="Actualizar/Crear" handleClick={this.handleCreateUpdate} />
        <Button name="Limpiar" handleClick={this.handleClear} />
        <Button name="Borrar" handleClick={this.handleDelete} />
      </div>
    );
  }
}
