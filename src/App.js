import React, { Component, Fragment } from 'react';
import Header from './common/header/index';
import store from './store/index';
import { Provider } from 'react-redux'
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home/load';
import Detail from './pages/detail/load';
import Login from './pages/login/load';
import WriteArticle from './pages/WriteArticle/load';
import Notification from './pages/notification';
import 'react-placeholder/lib/ReactPlaceholder';
import 'antd/dist/antd.css';
const NotMatch = (props) => {
  return (
    <div>404</div>
  )
}
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <BrowserRouter>

            <Fragment>
              <Header/> 
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/detail/:id" exact component={Detail}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/writeArticle" exact component={WriteArticle}/>
                <Route path="/notification" component={Notification}/>
                <Route path="*" component={NotMatch}/>  
              </Switch>
            </Fragment> 
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
