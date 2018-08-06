import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import Recommend from './components/Recommend';
import List from './components/List';
import Writer from './components/Writer';
import Topic from './components/Topic';
import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BannerImgWrapper,
  FindAll
} from './style';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,
      clientHeight: 0,
      isLoadingMoreArticleList: false,
      articlePage: 1
    }
  }
  
  componentDidMount() {
    const { initHomeData } = this.props;
    this.setState({
      articlePage: 1
    });
    initHomeData();
    this.setState({
      clientHeight: document.documentElement.clientHeight
    })
    // 添加页面滚动的监听函数， 实现懒加载功能
    window.addEventListener('scroll', this.handleWindowScroll);
    // 添加初次页面加载的监听函数， 获取整个页面的高度
    window.onload = () => {
      this.setState({
        scrollHeight: document.documentElement.scrollHeight
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
      scrollHeight,
      isLoadingMoreArticleList
    } = this.state;

    const newScrollTop = document.documentElement.scrollTop;
    const newScrollHeight = document.documentElement.scrollHeight;
    if (newScrollHeight !== scrollHeight) {
      this.setState({
        scrollHeight: newScrollHeight,
        isLoadingMoreArticleList: false
      })
    }

    if (newScrollTop + clientHeight + 50 >= scrollHeight && !isLoadingMoreArticleList) {
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
  initHomeData() {
    dispatch(actionCreater.initHomeData());
  },
  loadArticleList(page) {
    dispatch(actionCreater.loadMoreArticle(page));
  }
})

export default connect(null, mapDispatchToProps)(Home);