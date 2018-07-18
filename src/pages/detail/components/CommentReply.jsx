import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { escape } from 'lodash';
// import { HOST } from '../../libs/config';
import { 
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CommentInfo from './CommentInfo';
import CommentInput from './CommentInput';

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
  
  render() {
    const { classes } = this.props;
    const str = 'feafaewfawfaweffeawwwwwwwwwwwwfeawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww';
    return true ? (
      <Fragment>
          <div
            className={classes.commentReplyContainer}
          >
            <List
              className={classes.commentReplyList}
            >
              {
                new Array(2).fill(0).map((item, index) => {
                  return (
                    <div
                      key={index}
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
                          <a className="user-name">jack</a>
                          <span
                            className={classes.replayCommentContainer} 
                            dangerouslySetInnerHTML={{__html: this.escapeComment(str)}}
                          ></span>
                        </div>
                      </div>
                    <CommentInfo
                      onReplyClick={this.handleReplyClick}
                      info={{like: 18,  time: '2018-08-21 18:29:22'}}
                    />
                  </div>
                  )
                })
              }
            </List>
            
          </div>
      </Fragment>
      
    ) : null;
  }



  handleReplyClick = () => {
    const { onReplayClick } = this.props;
    onReplayClick('jack');
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