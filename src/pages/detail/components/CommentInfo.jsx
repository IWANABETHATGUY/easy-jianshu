import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from './SimpleMenu';

const styles = {
  replayCommentInfoContainer: {
    position: 'relative',
    display: 'flex', 
    margin: '0 10px 0 10px',
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

  
  render() {
    const { classes, info, onReplyClick, bordered, thisId, userId, loginUserID } = this.props;
    
    return (
      <div className={classes.replayCommentInfoContainer}
        style={bordered ? {borderBottom: '1px dashed #ccc',} : null}
      >
        <span className={classes.replayCommentInfo}>{info.time}</span>
        <span className={classes.replayCommentInfo}>
          <i className="iconfont" style={{cursor: 'pointer'}} onClick={this.handle}>&#xe701;</i>{info.like}
        </span>
        <Button 
          mini
          onClick={onReplyClick}
        >回复</Button>
        {
          userId === loginUserID && (
            <SimpleMenu
              thisId={thisId}
            />
          )
        }
      </div>
    );
  }

}

export default withStyles(styles)(CommentInfo)


