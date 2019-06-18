import React from 'react';
import ReactDOM from 'react-dom';

// import App from './components/App';
// ReactDOM.render(<App/>, document.querySelector('#root'));

import GradientAnimation from './components/GradientAnimation';
Promise.all([
  fetch('shaders/gradientAnimation.vert').then(x => x.text()),
  fetch('shaders/gradientAnimation.frag').then(x => x.text())
]).then(([vertResp, fragResp]) => {
  ReactDOM.render(<GradientAnimation vert={vertResp} frag={fragResp} />, document.querySelector('#root'));
});
