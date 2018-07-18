import React, { Component, Fragment } from 'react';
import { 
  List,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CommentListItem from './CommentListItem';

const styles = theme => ({
  commentList: {
    paddingBottom: '0'
  }
})

class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render() {
    const { classes } = this.props;
    return true ? (
      <List
        className={classes.commentList}
      >
        {
          new Array(5).fill(0).map((item, index) => {
            return (
              <CommentListItem
                key={index}
                index={index}
                />
            )
          })
        }
        
      </List>
      
    ) : null;
  }

}


export default withStyles(styles)(CommentList)