import React from 'react';
import Navigation from './Navigation/Navigation';
/* En JS on importe des éléments avec des chemins relatifs. 
De plus il n'est pas nécessaire de spécifier l'extension */
import { Provider } from 'react-redux' // ce conponent distribue le store à toute l'application
import Store from './Store/configureStore'

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
}

