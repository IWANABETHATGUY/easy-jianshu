import styled, { keyframes } from 'styled-components';

export const HomeWrapper = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 0 auto;
`

export const HomeLeft = styled.div`
  float: left;
  margin-left: 15px;
  padding-top: 30px;
  width: 625px;
  
`
export const BannerImgWrapper = styled.div`
  width: 625px;
  height: 280px;
  border-radius: 5px;
  overflow: hidden;
  .banner-img {
    width: 625px;
    height: 280px;
  }
`

export const HomeRight = styled.div`
  width: 240px;
  float: right;
  padding-top: 30px;
`
export const TopicWrapper = styled.div`
  overflow: hidden;
  padding: 20px 0 10px 0;
  border-bottom: 1px solid #dcdcdc;
`

export const TopicItem = styled.div`
  height: 32px;
  float: left;
  line-height: 32px;
  background: #f7f7f7;
  font-size: 14px;
  padding-right: 10px;
  border:1px solid #dcdcdc;
  border-radius: 4px;
  margin: 0 18px 18px 0;
  .topic-pic {
    display: block;
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
`

export const ListItem = styled.div`
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  .pic {
    display: block;
    width: 125px;
    height: 100px;
    float: right;
    border-radius: 10px;
  }
`

export const ListInfo = styled.div`
  width: 500px;
  float: left;
  .title {
    line-height: 27px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .desc {
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
`

export const ListMeta = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
  font-size: 12px;
  line-height: 20px;
  .author {
    display: inline-block;
    margin-right: 10px;
    text-decoration: none;
    line-height: 16px;
    color: #888;
  }
  .iconfont {
    iconfont: 10px;
    margin-right: 5px;
  }
  .comment {
    margin-right: 10px;
  }
  .like {
    margin-right: 10px;
  }
`

export const RecommendWrapper = styled.div`
  margin-bottom: 30px;
  height: 280px;
`

export const RecommendItem = styled.img`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  margin-bottom: 6px;
`

export const WriterWrapper = styled.div`
  width: 100%;
  .title {
    float: left;
    font-size: 14px;
    color: #969696;
  }
  .another {
    float: right;
    font-size: 14px;
    color: #969696;
    cursor: pointer;
  }
  .spin {
    font-size: 14px;
  }
  .meta {
    overflow: hidden;
  }
  &::after {
    content: "";
    display: block;
    visibility: hidden;
    height: 0;
    clear: both;
  }

`
export const WriterList = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0 0 20px;
`

export const WriterItem = styled.li`
  overflow: hidden;
  margin-top: 15px;
  width: 100%;
  .avator {
    display: block;
    float: left;
    width: 48px;
    height: 48px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .notice {
    float: right;
    color: #42c02e;
    margin-top: 5px;
    font-size: 13px;
  }
  .name {
    padding-top: 5px;
    margin-right: 60px;
    font-size: 14px;
    display: block;
    color: #333;
  }
  .desc {
    display: block;
    line-height: 20px;
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
  }
`

export const FindAll = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  padding: 7px 7px 7px 12px;
  font-size: 13px;
  box-sizing: border-box;
  background: #f7f7f7;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
`



export const BackTop = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
`
const Loading = keyframes`
  0% {
    transform: translateX(-30px) scale(0.7);
    z-index: 1;
  }
  25% {
    transform: translateX(0) scale(1.3);
    z-index: 20;
  }
  50% {
    transform: translateX(30px) scale(0.7);
    z-index: 2;
  }
  100% {
    transform: translateX(-30px);
  }
`

export const LoadMore = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 30px 0;
  background: #a5a5a5;
  color: #fff;
  text-align: center;
  border-radius: 20px;
`
export const LoadingBall = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: ${props => props.background};
  animation: ${Loading} 2s ${props => props.delay} ease-in-out infinite;
`