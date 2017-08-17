import React from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';
//mport Button from './Button';

export default class MasterComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      personas: [],
      selected_persona: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.loadData = this.loadData.bind(this);
    this.createData = this.createData.bind(this);
    this.deleteData = this.deleteData.bind(this);

    this.loadData();
  }

  /* REQUESTS */
  loadData() {
    let path = 'http://localhost:65317/api/Personas';
    let _this = this;
    axios.get(path).then(function(response) {
      let personas = response.data;
      _this.setState({personas: personas, selected_persona: _this.state.selected_persona});
    }).catch(function(error) {
      //console.log(error);
      _this.refs.form.showNotice('Error al conectar al servidor', true);
    });
  }
  deleteData() {
    //console.log('delete');
    let _this = this;
    if (this.state.selected_persona) {
      let path = 'http://localhost:65317/api/Personas/' + this.state.selected_persona.id;
      axios.delete(path).then(function(response) {
        let index = _this.state.personas.indexOf(_this.state.selected_persona);
        let personas = _this.state.personas;
        personas.splice(index, 1);
        _this.setState({personas: personas, selected_persona: null});
        _this.refs.form.showNotice('Usuario borrado satisfactoriamente', false);
      }).catch(function(error) {
        //console.log(error);
        _this.refs.form.showNotice('Error al conectar al servidor', true);
      });
    }
  }
  updateData(_this) {
    //console.log('update');
    if (_this.state.object.id != null && _this.state.object.id) {
      let path = 'http://localhost:65317/api/Personas/' + _this.state.object.id;
      axios.put(path, _this.state.object).then(function(response) {
        _this.showNotice('Usuario actualizado correctamente', false);
      }).catch(function(error) {
        //console.log(error);
        _this.showNotice('Error al actualizar al usuario', true);
      });
    }
  }
  createData(_this) {
    //console.log('create');
    let _this_ = this;
    if (!_this.state.object.id) {
      let path = 'http://localhost:65317/api/Personas';
      axios.post(path, _this.state.object).then(function(response) {
        _this.showNotice('Usuario creado correctamente', false);
        let personas = _this_.state.personas;
        personas.push(response.data);
        _this_.setState({personas: personas, selected_persona: response.data});
      }).catch(function(error) {
        //console.log(error);
        _this.showNotice('Error al actualizar al usuario', true);
      });
    }
  }

  /* HANDLE CLICKS */
  handleSelect(persona) {
    this.setState({personas: this.state.personas, selected_persona: persona});
    this.refs.form.setPersona(persona);
  }

  /* RENDER */
  render() {
    let list = [];
    if (this.state.personas) {
      let _this = this;
      var style = {cursor: 'pointer'};
      this.state.personas.forEach(function(persona) {
        list.push(
          <li key={persona.id} style={style} onClick={() => _this.handleSelect(persona)}>{persona.nombre}</li>
        );
      });
    }

    return (
      <div>
        <ul>
          {list}
        </ul>
        <FormComponent ref="form" object={this.state.selected_persona} handleDelete={this.deleteData} handleCreate={this.createData} handleUpdate={this.updateData}/>
      </div>
    );
  }
}
