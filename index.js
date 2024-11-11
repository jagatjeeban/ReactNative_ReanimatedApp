/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Cart from './src/screens/Cart';
import FloatingMenu from './src/screens/FloatingMenu';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => FloatingMenu);
