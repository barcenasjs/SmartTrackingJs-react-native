import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import * as screens from './screens';
import React from 'react';

export default function () {
  const views = Object.values(screens);
  views.map(View => {
    Navigation.registerComponent(View.name, () => props => (
      <Provider store={store}>
        <View.screen {...props} />
      </Provider>
    ));
  });
}
