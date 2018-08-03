import React, { Component } from 'react';
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
    const { followInfoList, listLoading } = this.state;
    return (
      <div>
        <div style={{fontWeight: 'bold', marginBottom: '20px', fontSize: '14px'}}>全部关注</div>
        {
          listLoading ? (
            <ReactPlaceholder type="media" rows={4}  ready={false} showLoadingAnimation={true}>
              {''}
            </ReactPlaceholder>
          ) : (
            <List>
              { followInfoList.map((item, index) => (
              <div key={index}>
                <Divider/>
                <div className={classes.replayComment}>
                  <Avatar component="a" className={classes.replayCommentAvatar}>
                    <i className="iconfont">&#xe6a4;</i>
                  </Avatar>
                  <div className={classes.replayCommentBox}>
                    <a className="user-name">{item.pseudonym}</a>
                    <span className={classes.replayCommentContainer}> 发布了新的文章 </span>
                    <a className={classes.articleTitle} href={`/detail/${item._id}`} target="_blank" onClick={this.handleCheckNotification.bind(this,
                      item.cid)}>{`《${item.title}》`}</a>
                  </div>
                </div>
                <div className={classes.replayCommentInfoContainer}>{item.meta.createdAt}</div>
              </div>
              )) }

            </List>
          )
        }
        
      </div>
    );
  }

  handleCheckNotification = (id) => {
    axios.get(`${HOST}/notification/checked?cid=${id}`, {
      withCredentials: true
    })
  }
}

export default withStyles(styles)(Follow);