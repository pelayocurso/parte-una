import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FormComponent from './Components/FormComponent';

var data = {
  nombre: 'Albert',
  apellido: 'Einstein',
  edad: 12
}

ReactDOM.render(
  <FormComponent object={data}/>,
   document.getElementById('root'));
