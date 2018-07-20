import React, { Component, Fragment } from 'react';
import Header from './common/header/index';
import store from './store/index';
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home/load';
import Detail from './pages/detail/load';
import Login from './pages/login/load';
import WriteArticle from './pages/WriteArticle/load';
import 'react-placeholder/lib/ReactPlaceholder';
import 'antd/dist/antd.css';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <BrowserRouter>
            <Fragment>
              <Header/> 
              <Route path='/' exact component={Home}></Route>
              <Route path='/detail/:id' exact component={Detail}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path="/writeArticle" exact component={WriteArticle}></Route>
            </Fragment>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
