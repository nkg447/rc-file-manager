import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import FileManager from './containers/FileManager';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={FileManager} />
    </Switch>
  </App>
);
