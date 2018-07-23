import React, { Component } from 'react';
import { Divider, List, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { HOST } from '../../../../libs/config';
import Item from '../../../../../node_modules/antd/lib/list/Item';

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
})

class Follow extends Component {
  state = {
    followInfoList: [],
    listLoading: false
  }

  componentDidMount() {
    this.setState({
      listLoading: true
    })
    axios.get(`${HOST}/notification/list?type=article`, {
      withCredentials: true
    })
      .then(res => {
        if (res.data.msg === 'success') {
          this.setState({
            followInfoList: res.data.data.list
          })
        }
        this.setState({
          listLoading: false
        })
      })
  }
  render() {
    const { classes } = this.props;
    const { followInfoList } = this.state;
    return (
      <div>
        <div style={{fontWeight: 'bold', marginBottom: '20px', fontSize: '14px'}}>全部关注</div>
        
        <List>
          {
            followInfoList.map((item, index) => (
              <div key={index}>
                <Divider/>
                <div className={classes.replayComment}>
                  <Avatar component="a" className={classes.replayCommentAvatar}>
                    <i className="iconfont">&#xe6a4;</i>
                  </Avatar>
                  <div className={classes.replayCommentBox}>
                    <a className="user-name">{item.pseudonym}</a>
                    <span className={classes.replayCommentContainer}> 发布了新的文章 </span>
                    <a className={classes.articleTitle} href={`/detail/${item._id}`} target="_blank">{`《${item.title}》`}</a>
                  </div>
                </div>
                <div className={classes.replayCommentInfoContainer}>{item.meta.createdAt}</div>
              </div>
            ))
          }
          
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Follow);