import React, { Component } from 'react';
import { 
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  Collapse
} from '@material-ui/core';
import { connect } from 'react-redux';
import { actionCreater } from '../store';
import CommentReply from './CommentReply';
import CommentInfo from './CommentInfo';
import CommentInput from './CommentInput';

class CommentListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBlockShow: false,
      prefix: ''
    }
  }
  
  render() {
    const { commentBlockShow, prefix } = this.state;
    const { index, commentIndex } = this.props;

    return (
      <div>
        <ListItem>
          <Avatar>
            <i className="iconfont">&#xe6a4;</i>
          </Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <div style={{padding: '0 24px', margin: '10px 0'}}>
          恭喜本文作者，本文已被由「小潘大大」主编的〖这个世界还有爱吗〗专题和〖简书文章精选集〗专题收录!期待作者创作更多的优秀作品，也期待各位围观同学的加入我们的专题。。
        </div>
        <CommentInfo 
          onReplyClick={this.handleFReplyClick}
          info={{like: 18, time: '2018-08-21 18:29:22'}} 
        />
        <CommentReply onReplayClick={this.handleReplyClick}/>
        <Collapse in={commentBlockShow && (index === commentIndex)} timeout="auto" unmountOnExit>
          <CommentInput 
            commentInputCon={commentBlockShow}
            placeholder={prefix}
            onClickCancel={this.handleClickCancel}/>
        </Collapse>
        <Divider/>
      </div>
    );
  }

  handleReplyClick = (prefix = '') => {
    const { index, changeCommentFocusedIndex } = this.props;
    this.setState({
      commentBlockShow: true,
      prefix,
      
    })
    changeCommentFocusedIndex(index);
  }

  handleFReplyClick = () => {
    const { index, changeCommentFocusedIndex } = this.props;
    this.setState({
      commentBlockShow: true,
      prefix: ''
    })
    changeCommentFocusedIndex(index);
  }

  handleClickCancel = () => {
    const { changeCommentFocusedIndex } = this.props;
    changeCommentFocusedIndex(-1);
  }
}

const mapStateToProps = (state) => ({
  commentIndex: state.detail.commentIndex
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeCommentFocusedIndex(index) {
      dispatch(actionCreater.changeInputIndex(index));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem)