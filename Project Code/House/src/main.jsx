import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';

// Get the root element where the app will be mounted
const rootElement = document.getElementById('root');

// Create and render the React app
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
