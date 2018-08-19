import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { NotificationWrapper } from './style';
import Info from './pages/personalnfo/index.jsx';
import Follow from './pages/follow/index.jsx';
import { connect } from 'react-redux';

const styles = {
  listContainer: {
    width: '280px',
    marginRight: '10px',
    '& .active': {
      background: '#f0f0f0',
      textDecoration: 'none'
    }
  },
  contentContainer: {
    flexGrow: 1,
    minHeight: '600px'
  },
  countBadge: {
    display: 'block',
    background: '#f50057',
    height: '25px',
    width: '25px',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '25px',
    color: '#fff'
  }
}
class Notification extends Component {

  render() {
    const { match, classes, location, isLogin } = this.props;
    const listItems = [
      {content: '个人信息', path: 'info', icon: `&#xe66c;`}, 
      {content: '关注', path: 'follow', icon: `&#xe668;`}
    ];
    return !isLogin ? <Redirect to="/login"/> : (
      <NotificationWrapper style={{display:'flex'}}>
        <Card className={classes.listContainer}>
          <List component="nav" >
            {
              listItems.map((item, index) => (
                <ListItem button key={index} component={Link} to={`${match.url}/${item.path}`}
                  className={location.pathname === `${match.url}/${item.path}` ? 'active' : ''}
                >
                  <ListItemIcon>
                    <i className="iconfont" dangerouslySetInnerHTML={{__html: item.icon}}></i> 
                  </ListItemIcon>
                  <ListItemText primary={item.content} />
                </ListItem>
                
              ))
            }
          </List>
        </Card>
        <Card className={classes.contentContainer}>
          <Switch>
            <Route path={`${match.url}/follow`}  exact component={Follow}></Route>
            <Route path={`${match.url}/info`}  exact component={Info}></Route>
            <Route exact render={() => <Redirect to={`${match.url}/info`}/>}></Route>
          </Switch>
        </Card>
      </NotificationWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  ucNotification: state.login.userInfo.ucNotification,
  isLogin: state.login.isLogin
})

export default connect(mapStateToProps, null)(
  withStyles(styles)(Notification)
)