import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { HOST } from '../../../libs/config';
import { withStyles } from '@material-ui/core/styles';
import { openNotificationWithIcon } from '../../../libs/utils';
const styles = theme => ({
  card: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit
  },
  commitComment: {
    background: '#42c02e',
    color: '#fff',
    fontSize: '16px',
    margin: '10px 0'
  },
  commentInput: {
    paddingBottom: '0',
    marginBottom: '0',
    paddingTop: '0'
  }

})

class CommentInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentInputFocus: false,
      content: ''
    }
  }
  
  render() {
    const { 
      classes, 
      commentInputCon, 
      prefix,
      rtc
    } = this.props;
    return (
      <Fragment>
        <TextField
          className={classes.commentInput}
          label="请输入评论"
          multiline
          rows="3"
          onFocus={this.handleArticleCommentChange.bind(this, true)}
          // onBlur={this.handleArticleCommentChange.bind(this, false)}
          autoFocus={rtc}
          placeholder={prefix}
          // className={classes.articleContent}
          margin="normal"
          fullWidth
          onChange={this.handleContentChange}
        />
        <Collapse in={this.state.commentInputFocus || commentInputCon } timeout="auto" unmountOnExit style={{display: 'flex', justifyContent:
          'flex-end', alignItems: 'baseline'}}>
          <Button aria-label="Delete" 
            buttonRef={cancel => this.cancel =cancel }
            className={classes.button} onClick={this.handleClickCancel.bind(this, false)} size="medium">
            取消
          </Button>
          <Button 
            className={classes.commitComment} variant="extendedFab" aria-label="Delete" size="medium"
            onClick={this.handleClickSend}
            >
            发送
          </Button>
        </Collapse>
      </Fragment>
      
    );
  }

  handleContentChange  = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  handleArticleCommentChange = (status) => {
    this.setState({
      commentInputFocus: status
    })
  }

  handleClickCancel = (status) => {
    const {onClickCancel} = this.props;
    this.setState({
      commentInputFocus: status
    })
    if (onClickCancel) {
      onClickCancel();
    }
  }

  handleClickSend = () => {
    const {prefix, rtc, pseudonym, articleId, userID, cid, ucid} = this.props;
    const { content } = this.state;
    const combineContent = prefix === undefined ? "" : prefix + content;
    axios.post(`${HOST}/comment/addComment`, {
      pseudonym,
      content: combineContent,
      rtc,
      articleId,
      ucid,
      cid,
      userID
    })
      .then((res) => {
        if (res.data.msg === 'success') {
          openNotificationWithIcon('success', '成功', '提交评论成功');
          this.cancel.click();
        } else {
          openNotificationWithIcon('error', '失败', '提交评论失败');
        }
      })
  }
}

const mapStateToProps = (state) => ({
  articleId: state.detail.articleId,
  pseudonym: state.login.userInfo.pseudonym,
  userID: state.login.userInfo.userID
})


export default connect(mapStateToProps, null)(
  withStyles(styles)(CommentInput)
);