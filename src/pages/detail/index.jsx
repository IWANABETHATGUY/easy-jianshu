import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { HOST } from '../../libs/config';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { withRouter } from 'react-router-dom';
import { 
  Card,
  Divider,
  Typography,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  DetailWrapper,
  Header,
  CommentWrapper,
  ImgContainer
} from './style';
import CommentList from './components/CommentList';
import CommentInput from './components/CommentInput';
import { actionCreater } from './store';

const styles = theme => ({
  card: {
    width: '100%',
  },
  button: {
    '.iconfont': {
      color: '#f00'
    }
  }
})

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null
    }
  }

  componentDidMount() {
    const {changeArticleId, getCommentList, getArticle} = this.props;
    const id = this.props.match.params.id;
    getArticle(id);
    changeArticleId(id);
    getCommentList(id, 1);
  }
  
  render() {
    const { classes, commentPage, article, totalComment } = this.props;
    return article ? (
      <Fragment>
        <DetailWrapper>
          <Header>
            {article.title}
          </Header>
          <Card className={classes.card}>
            <ImgContainer>
              <img src="http://upload-images.jianshu.io/upload_images/137912-62b32286441b8b47.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"
                alt="" />
            </ImgContainer>
            <div className="markdown-body" style={{padding: '10px'}} dangerouslySetInnerHTML={{__html: article.content}}>
            </div>
          </Card>

        </DetailWrapper>
        <DetailWrapper>
          <Button variant="extendedFab" aria-label="Delete" className={classes.button}
            onClick={this.handleLike}
          >
            <i className={['iconfont', article.isLiked ? 'like' : ''].join(' ').trim()}>&#xe61e;</i>
            <span style={{margin: '0 10px'}}>喜欢丨</span>
            {article.like}
          </Button>
        </DetailWrapper>
        
        <CommentWrapper>
          <Card>
            <CommentInput
              rtc={false}
              cid={null}
              ucid={null}
              prefix={""}
              />
          </Card>
        </CommentWrapper>
        <CommentWrapper>
          <Card>
            <Typography variant="headline">{totalComment}条评论</Typography>
            <Divider/>
            <CommentList/>
          </Card>
        </CommentWrapper>
        
        <Pagination
          onChange={this.handlePaginationChange}
          current={commentPage}
          total={article.ucCount}
          showLessItems
          showTitle={false}
          style={{margin: '10px', display: 'flex', justifyContent: 'center'}}
          />
      </Fragment>
      
    ) : null;
  }

  handlePaginationChange = (page) => {
    const { getCommentList, changeCommentPage } = this.props;
    const id = this.props.match.params.id;
    changeCommentPage(page);
    getCommentList(id, page);
  }

  handleLike = () => {
    const {article, getArticle} = this.props;
    if (!article.isLiked) {
      axios.get(`${HOST}/article/like?id=${article._id}`, {
        withCredentials: true
      })
        .then(res => {
          if (res.data.msg === 'success') {
            getArticle(article._id);
          }
        })
    } else {
      axios.delete(`${HOST}/article/like?id=${article._id}`, {
        withCredentials: true
      })
        .then(res => {
          if (res.data.msg === 'success') {
            getArticle(article._id);
          }
        })
    }
  }
}

const mapStateToProps = (state) => ({
  commentPage: state.detail.commentPage,
  totalComment: state.detail.totalComment,
  article: state.detail.article
})

const mapDispatchToProps = (dispatch) => ({
  changeArticleId(id) {
    dispatch(actionCreater.changeArticleId(id));
  },
  getCommentList(id, page) {
    dispatch(actionCreater.getCommentList(id, page));
  },
  changeCommentPage(page) {
    dispatch(actionCreater.changeCommentPage(page));
  },
  changeTotalComment(total) {
    dispatch(actionCreater.changeTotalComment(total));
  },
  getArticle(id) {
    dispatch(actionCreater.getArticle(id));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(Detail))
);
