import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { Card, List, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { NotificationWrapper } from './style';
import Comment from './pages/comment/index.jsx';
import Follow from './pages/follow/index.jsx';

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
  }
}
class Notification extends Component {
  render() {
    const listItems = [{content: '评论', path: 'comment'}, {content: '关注', path: 'follow'}];
    const { match, classes, location } = this.props;

    return (
      <NotificationWrapper style={{display:'flex', }}>
        <Card className={classes.listContainer}>
          <List component="nav" >
            {
              listItems.map((item, index) => (
                <ListItem button key={index} component={Link} to={`${match.url}/${item.path}`}
                  className={location.pathname === `${match.url}/${item.path}` ? 'active' : ''}
                >
                  <ListItemText primary={item.content} />
                </ListItem>
                
              ))
            }
          </List>
        </Card>
        <Card className={classes.contentContainer}>
          <Route path={`${match.url}/comment`}  exact component={Comment}></Route>
          <Route path={`${match.url}/follow`}  exact component={Follow}></Route>
          <Route exact render={() => <Redirect to={`${match.url}/comment`}/>}></Route>
        </Card>
      </NotificationWrapper>
    );
  }
}

export default withStyles(styles)(Notification);