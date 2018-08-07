import React, { Component } from 'react';
import  { connect } from 'react-redux';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import CommentListItem from './CommentListItem';

const styles = theme => ({
  commentList: {
    paddingBottom: '0'
  }
})

class CommentList extends Component {

  componentDidMount() {

      
  }
  
  render() {
    const { classes, commentList } = this.props;
    return true ? (
      <List
        className={classes.commentList}
      >
        {
          commentList.map((item) => {
            return (
              <CommentListItem
                key={item._id}
                comment={item}
                index={item._id}
                />
            )
          })
        }
        
      </List>
      
    ) : null;
  }

}

const mapStateToProps = (state) => ({
  commentList: state.detail.commentList
})

export default connect(mapStateToProps, null)(
  withStyles(styles)(CommentList)
)