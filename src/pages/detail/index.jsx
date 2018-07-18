import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { HOST } from '../../libs/config';
import { 
  Card,
  Divider,
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

const styles = theme => ({
  card: {
    width: '100%',
  },
})

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      article: null,
    }
  }

  componentDidMount() {
    const { id } = this.state;
    axios.get(`${HOST}/article/getArticle?id=${id}`)
      .then((res) => {
        if (res.data.msg === 'success') {
          this.setState({
            article: res.data.data.article
          })
        }
      })
  }
  
  render() {
    const { article } = this.state;
    const { classes } = this.props;
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
            <CommentInput/>
          </Card>
        </CommentWrapper>
        <CommentWrapper>
          <Card>
            评论
            <Divider/>
            <CommentList/>
          </Card>
        </CommentWrapper>
      </Fragment>
      
    ) : null;
  }


}


export default withStyles(styles)(Detail);
