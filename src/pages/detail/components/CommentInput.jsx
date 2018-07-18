import React, { Component, Fragment } from 'react';
import { 
  TextField,
  Collapse,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
      commentInputFocus: false
    }
  }
  
  render() {
    const { classes, commentInputCon, prefix } = this.props;
    return (
      <Fragment>
        <TextField
          className={classes.commentInput}
          label="请输入评论"
          multiline
          rows="3"
          onFocus={this.handleArticleCommentChange.bind(this, true)}
          onBlur={this.handleArticleCommentChange.bind(this, false)}
          autoFocus={true}
          placeholder={prefix}
          // className={classes.articleContent}
          margin="normal"
          fullWidth
      // onChange={this.handleContentChange}
        />
        <Collapse in={this.state.commentInputFocus || commentInputCon } timeout="auto" unmountOnExit style={{display: 'flex', justifyContent:
          'flex-end', alignItems: 'baseline'}}>
          <Button aria-label="Delete" className={classes.button} onClick={this.handleClickCancel.bind(this, false)} size="medium">
            取消
          </Button>
          <Button className={classes.commitComment} variant="extendedFab" aria-label="Delete" size="medium">
            发送
          </Button>
        </Collapse>
      </Fragment>
      
    );
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
    onClickCancel();
  }
}

export default withStyles(styles)(CommentInput);