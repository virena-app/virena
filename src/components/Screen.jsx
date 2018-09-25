import React from 'react';

const screenStyle = {
  color: 'blue'
}

const Screen = props => {
  return(
    <div style={screenStyle}>
      <h1>Screen {props.screenNum}</h1>
    </div>
  )
}

export default Screen;