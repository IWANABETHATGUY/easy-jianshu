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
    let acomment = getTypeCommentNotification('acomment');
    let ccomment = getTypeCommentNotification('ccomment');
    Promise.all([acomment, ccomment])
      .then(res => {
        this.setState({
          commentInfoList: [...(res[0].data.data.list), ...(res[1].data.data.list)],
          listLoading: false
        })
      })
  }
  render() {
    const { classes } = this.props;
    const { commentInfoList, listLoading } = this.state;
    return (
      <div>
        <div style={{fontWeight: 'bold', marginBottom: '20px', fontSize: '14px'}}>收到的评论</div>
        { listLoading ? (
          // style={{width: '100px', height: '50px', margin: '0 auto'}}
          <ReactPlaceholder type="media" rows={4}  ready={false} showLoadingAnimation={true}>
            {''}
          </ReactPlaceholder>
        ) : (
          <List>
          {
            commentInfoList.map((item, index) => (
              <div key={index}>
                <Divider/>
                <div className={classes.replayComment}>
                  <Avatar component="a" className={classes.replayCommentAvatar}>
                    <i className="iconfont">&#xe6a4;</i>
                  </Avatar>
                  <div className={classes.replayCommentBox}>
                    <a className="user-name">{item.pseudonym}</a>
                    {
                      item.type === 'acomment' ? (
                        <Fragment>
                          <span className={classes.replayCommentContainer}>在文章<a >{`《${item.title}》`}</a> </span>
                          <div className={classes.comment}>
                            <em>回复了你</em>
                            
                            <a className={classes.articleTitle}  
                            // target="_blank"
                            // {/* onClick={this.handleCheckNotification.bind(this, item.cid)} */} 
                            // {/* href={`/detail/${item._id}`} */}

                            >{item.content}</a>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <span className={classes.replayCommentContainer}> {item.content} </span>
                          <div className={classes.comment}>
                            <em>回复了你的评论</em>
                            <a className={classes.articleTitle} 
                            // href={`/detail/${item._id}`} target="_blank" 
                            // onClick={this.handleCheckNotification.bind(this, item.cid)}
                            >{`${item.rcontent}`}</a>
                          </div>
                        </Fragment>
                        
                      )
                    }
                  </div>
                </div>
                <div className={classes.replayCommentInfoContainer}>{item.meta.createdAt}</div>
              </div>
            ))
          }
          </List>)
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

export default withStyles(styles)(Comment);