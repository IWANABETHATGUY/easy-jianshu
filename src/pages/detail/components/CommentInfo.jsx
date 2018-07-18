import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  replayCommentInfoContainer: {
    display: 'flex', 
    margin: '0 10px 0 10px', 
    borderBottom: '1px dashed #ccc',
    alignItems: 'center',
    padding: '5px'
  },
  replayCommentInfo: {
    fontSize: '12px',
    color: '#99a2aa',
    marginRight: '20px'
  }
}

class CommentInfo extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { classes, info, onReplyClick } = this.props;
    return (
      <div className={classes.replayCommentInfoContainer}>
        <span className={classes.replayCommentInfo}>{info.time}</span>
        <span className={classes.replayCommentInfo}>
          <i className="iconfont" style={{cursor: 'pointer'}} onClick={this.handle}>&#xe701;</i>{info.like}
        </span>
        <Button 
          mini
          onClick={onReplyClick}
        >回复</Button>
      </div>
    );
  }

}

export default withStyles(styles)(CommentInfo)


