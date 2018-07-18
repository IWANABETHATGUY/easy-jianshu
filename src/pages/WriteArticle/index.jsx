import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import hljs from 'highlightjs';
import Remarkable from 'remarkable';
import { actionCreater } from './store';
import { 
  Button, 
  Card,
  TextField,
  Modal
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { WriteArticleWrapper } from './style';
import { HOST } from '../../libs/config';

const styles = theme => ({
  card: {
    marginTop: 30,
    padding: '0 20px'
  },
  articleTitle: {
    width: '90%'
  },
  articleContent: {
  },
  paper: {
    position: 'fixed',
    height: 800,
    top: '50%',
    left: '50%',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '960px'
  },
  commitArticle: {
    margin: '10px 0',
    float: 'right'
  }
})
// 初始化remarkable
const md = new Remarkable({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});

class WriteArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      markdownModal: false,
      renderedMarkdown: ''
      
    }
  }
  
  render() {
    const { isLogin, classes } = this.props;
    return isLogin ? (
      <WriteArticleWrapper>
        <Card className={classes.card}>
          <div style={{margin: '10px 0 0 0'}}>
            <Button 
              variant="extendedFab" 
              aria-label="Delete" 
              className={classes.button}
              onClick={this.handleClickMarkDown}
            >
              查看MARKDOWN结果
            </Button>
          </div>
          <TextField
            label="请输入文章标题"
            className={classes.articleTitle}
            onChange={this.handleTitleChange}
            margin="normal"
          />
          <TextField
            id="multiline-static"
            label="请输入正文"
            multiline
            rows="30"
            defaultValue=""
            className={classes.articleContent}
            margin="normal"
            fullWidth
            onChange={this.handleContentChange}
          />
          <Button
            variant="contained" 
            color="primary"
            className={classes.commitArticle}
            onClick={this.handleSaveMarkdown}
          >
            <i className="iconfont">&#xe627;</i>
            提交
          </Button>
        </Card>
        <Modal
          
          open={this.state.markdownModal}
          onClose={this.handleCloseModal}
        >
          <Card 
            ref={(markdownWrapper) => this.markdown = markdownWrapper}
            className={classes.paper}
          >
           <div 
            className="markdown-body"
            dangerouslySetInnerHTML={{__html: this.state.renderedMarkdown}}>
           </div>
          </Card>
          
        </Modal>
      </WriteArticleWrapper>
    ) : <Redirect to="/login"/>
  }

  handleSaveMarkdown = () => {
    const result =  this.renderMarkdown();
    this.setState({
      renderedMarkdown: result
    });
    this.publishNewArticle(result)
  }

  handleClickMarkDown = () => {
    const result =  this.renderMarkdown();
    this.setState({
      renderedMarkdown: result,
      markdownModal: true
    });
  }

  handleContentChange = (e) => {
    this.setState({
      content: e.target.value
    })
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  };

  handleCloseModal = () => {
    this.setState({ markdownModal: false });
  };

  renderMarkdown = () => {
    let hljsMarkdown = md.render(this.state.content);
    const reg = /(<code class="language-)([a-z]+)"(>[\w\W]*?<\/code>)/g;
    const result = hljsMarkdown.replace(reg,  (match, p1, p2, p3) => {
      return [p1, p2, `" data-language="${p2}"`, p3].join('');
    });
    return result;
  };

  publishNewArticle = (markdownContent) => {
    const {pseudonym, userID} = this.props;
    axios.post(`${HOST}/article/addArticle`, {
      pseudonym,
      content: markdownContent,
      title: this.state.title,
      tags: [],
      userID
    }, {
      withCredentials: true
    })
    .then(res => {
      if (res.data.msg === 'success') {
        alert('published successfully');
      } else {
        alert('published failed');
      }
    }) 
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
  pseudonym: state.login.userInfo.pseudonym,
  userID: state.login.userInfo.userID,
})

export default connect(mapStateToProps, null)(
  withStyles(styles)(WriteArticle)
)