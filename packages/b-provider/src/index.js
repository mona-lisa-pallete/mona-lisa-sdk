import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyPolyfills,
  defineCustomElements,
} from '@davinci/components';

applyPolyfills().then(function () {
  defineCustomElements(window);
});

import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

module.hot.accept();
