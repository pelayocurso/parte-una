import React from 'react';

export default class ShowNotice extends React.Component {

  render() {
    let color = {width: '100%', background: 'green'};
    if (this.props.isError) {
      color = {width: '100%', background: 'red'};
    }

    let response = null;
    if (this.props.message) {
      response = (
        <div style={color}>
          {this.props.message}
        </div>
      );
    }
    return response;
  }
}
