import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { HOST } from '../../libs/config';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { 
  Card,
  Divider,
  Typography
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
import { actionCreater, action } from './store';

const styles = theme => ({
  card: {
    width: '100%',
  },
})

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null
    }
  }

  componentDidMount() {
    const {changeArticleId, getCommentList} = this.props;
    const id = this.props.match.params.id;
    axios.get(`${HOST}/article/getArticle?id=${id}`)
      .then((res) => {
        if (res.data.msg === 'success') {
          this.setState({
            article: res.data.data.article
          })
        }
      })
    changeArticleId(id);
    getCommentList(id, 1);
  }
  
  render() {
    const { article } = this.state;
    const { classes, commentPage } = this.props;
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
            <Typography variant="headline">{article.comment}条评论</Typography>
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

}


const mapDispatchToProps = (dispatch) => ({
  changeArticleId(id) {
    dispatch(actionCreater.changeArticleId(id));
  },
  getCommentList(id, page) {
    dispatch(actionCreater.getCommentList(id, page));
  },
  changeCommentPage(page) {
    dispatch(actionCreater.changeCommentPage(page));
  }
})

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(Detail)
);
