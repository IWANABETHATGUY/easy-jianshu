import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { HOST } from '../../libs/config';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
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
    background: '#ffffff',
    '.iconfont': {
      color: '#f00'
    }
  },
  followButton: {
    width:'125px',
    background: '#42c02e',
    alignSelf: 'center',
    marginRight: '20px',
    height: '45px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: '30px',
    '&.followed': {
      background: '#f0f0f0',
      color: '#8c8c8c',
    }
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      followButtonContent: '已关注'
    }
  }

  componentDidMount() {
    const {changeArticleId, getCommentList, getArticle, userId} = this.props;
    const id = this.props.match.params.id;
    getArticle(id, userId);
    changeArticleId(id);
    getCommentList(id, 1);

    window.onload = () => {
      let count = 0;
      const hash = window.location.hash;
      const id = hash.slice(1);
      if (hash !== "") {
        const load = setInterval(() => {
          let comment = document.querySelector(`#${id}`);
          if (count++ > 50) {
            clearInterval(load);
          }
          if (comment) {
            window.location.hash = "";
            window.location.hash = hash;
            comment.classList.add('tip');
            setTimeout(() => {
              comment.classList.remove('tip');
            }, 100);
            clearInterval(load);
          }
        }, 100)
      }
    }
  }
  
  render() {
    const { classes, commentPage, article, totalComment, isFollowed, userId } = this.props;
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
          <Card className={classes.userInfo}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title={article.pseudonym}
            subheader="September 14, 2016"
          >
          </CardHeader>
          {
            userId === article.userID ? null : (
              <Button variant="outlined" 
                className={[classes.followButton, isFollowed ? 'followed' : '' ].join( ' ').trim()} 
                onMouseLeave={this.handleFollowLeave.bind(this, isFollowed)} 
                onMouseEnter={this.handleFollowEnter.bind(this, isFollowed)}
                onClick={this.handleFollowClick.bind(this, article.userID)}
              >
                {isFollowed ? this.state.followButtonContent : '+ 关注'}
              </Button>
            )
          }
          </Card>
        </DetailWrapper>
        <DetailWrapper>
          <Button variant="extendedFab" aria-label="Delete" 
            className={classes.button} onClick={this.handleLike}
          >
            <i className={[ 'iconfont', article.isLiked ? 'like' : ''].join( ' ').trim()}>&#xe61e;</i>
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
  handleFollowEnter = (followed) => {
    if (!followed) {
      return;
    }
    this.setState({
      followButtonContent: 'x 取消关注'
    })
  }
  handleFollowLeave = (followed) => {
    if (!followed) {
      return ;
    }
    this.setState({
      followButtonContent: '已关注'
    })
  }
  handleLike = () => {
    const {article, getArticle} = this.props;
    if (!article.isLiked) {
      axios.get(`${HOST}/article/like?id=${article._id}`, {
        withCredentials: true
      })
        .then(res => {
          if (res.data.msg === 'success') {
            getArticle(article._id, undefined, false);
          }
        })
    } else {
      axios.delete(`${HOST}/article/like?id=${article._id}`, {
        withCredentials: true
      })
        .then(res => {
          if (res.data.msg === 'success') {
            getArticle(article._id, undefined, false);
          }
        })
    }
  }

  handleFollowClick = (authorId) => {
    const { followAuthor, isFollowed, cancelFollowAuthor, userId} = this.props;
    if (!isFollowed) {
      followAuthor(authorId, userId);
    } else {
      cancelFollowAuthor(authorId, userId);
    }
  }
}

const mapStateToProps = (state) => ({
  commentPage: state.detail.commentPage,
  totalComment: state.detail.totalComment,
  article: state.detail.article,
  isFollowed: state.detail.isFollowed,
  userId: state.login.userInfo.userID
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
  getArticle(id, userId, init = true) {
    dispatch(actionCreater.getArticle(id, userId, init));
  },
  getIsFollowed(userId, authorId) {
    dispatch(actionCreater.getIsFollowed(userId, authorId));
  },
  followAuthor(authorId) {
    dispatch(actionCreater.followAuthor(authorId));
  },
  cancelFollowAuthor(authorId) {
    dispatch(actionCreater.cancelFollowAuthor(authorId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(Detail))
);
