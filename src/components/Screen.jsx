import React from 'react';

const screenStyle = {
  color: '#333'
}

const Screen = props => {
  return(
    <div style={screenStyle}>
      <h1>Screen {props.screenNum}</h1>
    </div>
  )
}

export default Screen;