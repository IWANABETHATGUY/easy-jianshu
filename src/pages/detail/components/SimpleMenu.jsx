import React, { Fragment } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';
import { actionCreater } from '../store';
import { connect } from 'react-redux';
import { HOST } from '../../../libs/config';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => {
  return {
    more: {
      position: 'absolute',
      right: '0'
    }
  }
}

class SimpleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }
  
  handleIconClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRemoveItemClick = () => {
    const { thisId,  articleId, commentPage, getTotalComment, getCommentList } = this.props;
    this.setState({ anchorEl: null });
    axios.delete(`${HOST}/comment/delete?id=${thisId}`)
      .then(res => {
        if (res.data.msg === 'success') {
          getCommentList(articleId, commentPage);
          getTotalComment(articleId);
        } else {
        }
      })
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleIconClick}
          className={classes.more}
        >
          <i className="iconfont">&#xe686;</i>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 200 * 4.5,
              width: 150,
            },
          }}
        >
          <MenuItem onClick={this.handleRemoveItemClick}>删除</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  articleId: state.detail.articleId,
  commentPage: state.detail.commentPage
})

const mapDispatchToProps = (dispatch) => ({
  getCommentList(id, page) {
    dispatch(actionCreater.getCommentList(id, page));
  },
  getTotalComment(id) {
    dispatch(actionCreater.getTotalComment(id));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SimpleMenu)
)