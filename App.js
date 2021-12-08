import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import Header from './components/Header';
import Navigation from './navigators/Navigation';
import Toast from 'react-native-toast-message';
import ShopContextProvider from './context/ShopContext';

//Redux
import store from './redux/store';
import { Provider } from 'react-redux';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <ShopContextProvider>
      <Provider store={store}>
        <Header />
        <Navigation />
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <StatusBar style='auto' />
      </Provider>
    </ShopContextProvider>
  );
};

export default App;
