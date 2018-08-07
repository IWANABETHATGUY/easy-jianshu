import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { escape } from 'lodash-es';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import CommentInfo from './CommentInfo';
import { CommentContainer } from '../style';
const style = theme => ({
  commentReplyContainer: {
    borderLeft: '3px solid #000'
  },
  commentReplyList: {
    paddingBottom: '0',
  },
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
    marginLeft: '10px'
  },
  replayCommentContainer: {
    padding: '0 10px',
    wordBreak: 'break-word'
  },

})

class CommentReply extends Component {
  componentDidMount() {

  }
  
  render() {
    const { classes, replies } = this.props;
    return replies.length > 0 ? (
      <Fragment>
          <div
            className={classes.commentReplyContainer}
          >
            <List
              className={classes.commentReplyList}
            >
              {
                replies.map((item, index) => {
                  return (
                    <CommentContainer
                      id={`comment-${item._id}`}
                      key={item._id}
                    >
                      <div 
                        className={classes.replayComment}
                      >
                        <Avatar
                          component="a"
                          className={classes.replayCommentAvatar}
                        >
                          <i className="iconfont">&#xe6a4;</i>
                        </Avatar>  
                        <div
                          className={classes.replayCommentBox} 
                        >
                          <a className="user-name">{item.pseudonym}</a>
                          <span
                            className={classes.replayCommentContainer} 
                            dangerouslySetInnerHTML={{__html: this.escapeComment(item.content)}}
                          ></span>
                        </div>
                      </div>
                    <CommentInfo
                      bordered={true}
                      thisId={item._id}
                      onReplyClick={this.handleReplyClick.bind(this, item.pseudonym, item._id)}
                      info={{like: item.like,  time: item.meta.createdAt}}
                    />
                  </CommentContainer>
                  )
                })
              }
            </List>
            
          </div>
      </Fragment>
      
    ) : null;
  }



  handleReplyClick = (name, cid) => {
    const { onReplayClick } = this.props;
    onReplayClick(`回复 @${name}:`, cid);
  }
  
  escapeComment = (str) => {
    return str.split('\n').map(item => escape(str)).join('<br>');
  }
}

// const mapStateToProps = (state) => ({
//   articleList: state.home.articleList
// });

export default connect(null, null)(
  withStyles(style)(CommentReply)
)