import React, { Component, Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { HOST } from '../../../../libs/config';
import ReactPlaceholder from 'react-placeholder';

const styles = theme => ({
  replayComment: {
    display: 'flex', 
    margin: '10px 10px 0 10px', 
    alignItems: 'flex-start',
    padding: '5px'
  },
  replayCommentAvatar: {
    width: '30px',
    height: '30px',
  },
  replayCommentBox: {
    width: '100%',
    marginLeft: '10px',
    fontSize: '16px'
  },
  replayCommentContainer: {
    padding: '0 10px',
    wordBreak: 'break-word'
  },
  replayCommentInfoContainer: {
    position: 'relative',
    display: 'flex', 
    margin: '0 10px 0 10px',
    alignItems: 'center',
    padding: '5px'
  },
  comment: {
    background: '#f0f0f0'
  }
})

const getTypeCommentNotification = (type) => {
  return new Promise((resolve, reject) => {
    axios.get(`${HOST}/notification/list?type=${type}`, {
      withCredentials: true
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  })
}
class Comment extends Component {
  state = {
    commentInfoList: [],
    listLoading: false
  }

  componentDidMount() {
    this.setState({
      listLoading: true
    })
  }
  render() {
    return (
      null
    );
  }

  
}

export default withStyles(styles)(Comment);