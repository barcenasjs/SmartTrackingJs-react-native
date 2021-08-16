/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
import {startApp} from './src/navigation';
import {Navigation} from 'react-native-navigation';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
Navigation.events().registerAppLaunchedListener(() => startApp());

//AppRegistry.registerComponent(appName, () => App);
