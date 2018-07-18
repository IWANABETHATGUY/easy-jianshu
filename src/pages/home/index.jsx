import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  initHomeData,
  loadMoreArticle
} from './store/actionCreater';
import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BannerImgWrapper,
  FindAll
} from './style';
import Recommend from './components/Recommend';
import List from './components/List';
import Writer from './components/Writer';
import Topic from './components/Topic';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetHeight: 0,
      clientHeight: 0,
      isLoadingMoreArticleList: false,
      articlePage: 0
    }
  }
  
  componentDidMount() {
    const { changeHomeData } = this.props;
    this.setState({
      articlePage: 0
    });
    changeHomeData();
    this.setState({
      clientHeight: document.documentElement.clientHeight
    })
    // 添加页面滚动的监听函数， 实现懒加载功能
    window.addEventListener('scroll', this.handleWindowScroll);
    // 添加初次页面加载的监听函数， 获取整个页面的高度
    window.onload = () => {
      this.setState({
        offsetHeight: document.documentElement.offsetHeight
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }


  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <BannerImgWrapper>
            <img
            className="banner-img"
            src="//upload.jianshu.io/admin_banners/web_images/4338/8e2a58455e68291fd10f2a926ed793a016a66e2e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/>
          </BannerImgWrapper>
          <Topic/>
          <List/>
        </HomeLeft>
        <HomeRight>
          <Recommend/>
          <Writer/>
          <FindAll>查看全部 ></FindAll>
        </HomeRight>
      </HomeWrapper>
    );
  }
  handleWindowScroll = () => {
    const { 
      clientHeight, 
      offsetHeight,
      isLoadingMoreArticleList
    } = this.state;

    const newScrollTop = document.documentElement.scrollTop;
    const newOffsetHeight = document.documentElement.offsetHeight;
    if (newOffsetHeight !== offsetHeight) {
      this.setState({
        offsetHeight: newOffsetHeight,
        isLoadingMoreArticleList: false
      })
    }

    if (newScrollTop + clientHeight + 300 >= offsetHeight && !isLoadingMoreArticleList) {
      const { 
        loadArticleList
      } = this.props;
      const { articlePage } = this.state;
      this.setState({
        isLoadingMoreArticleList: true,
        articlePage: articlePage + 1
      })
      loadArticleList(articlePage + 1);
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeHomeData() {
    dispatch(initHomeData());
  },
  loadArticleList(page) {
    dispatch(loadMoreArticle(page));
  }
})

export default connect(null, mapDispatchToProps)(Home);