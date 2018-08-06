import Loadable from 'react-loadable';
import React from 'react';
import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BannerImgWrapper,
  FindAll,
  RecommendItem,
  TopicWrapper,
  WriterWrapper,
  WriterItem
} from './style';
import ReactPlaceholder from 'react-placeholder';

const Loading = () => {
  return (
    <HomeWrapper>
        <HomeLeft>
          <BannerImgWrapper>
          <ReactPlaceholder type="rect" style={{width: '625px', height: '280px'}} ready={false} showLoadingAnimation={true}>
            {''}
          </ReactPlaceholder>
          </BannerImgWrapper>
          <TopicWrapper>
          <ReactPlaceholder type="rect" style={{width: '625px', height: '131px', margin: '0 auto'}} ready={false} showLoadingAnimation={true}>
          {''}
        </ReactPlaceholder>
          </TopicWrapper>
          <ReactPlaceholder type="media" rows={4} ready={false} showLoadingAnimation={true}>
          {''}
        </ReactPlaceholder>
        {
            new Array(5).fill(0).map((item, index) => (
              <ReactPlaceholder key={index} type="media" rows={4} ready={false} showLoadingAnimation={true}>
                {''}
              </ReactPlaceholder>
            ))
          }
        </HomeLeft>
        <HomeRight>
          {
            new Array(5).fill(0).map((item, index) => {
              return (
                <RecommendItem
                  key={index}
                  imgUrl={'#ccc'}
                >
                  
                </RecommendItem>
              )
            })
          }
          <WriterWrapper>
            <ReactPlaceholder type="textRow" rows={1} ready={false} showLoadingAnimation={true}>
              {''}
            </ReactPlaceholder>
            <WriterItem>
              <a className="avator" style={{background: '#ccc', borderRadius: '50%'}}>
              </a>
              <a href="" className="name" style={{background: '#ccc', width: '60px', margin: '0 60px', height: '15px'}}>
              </a>
              <p className="desc" style={{background: '#ccc', width: '150px', height: '16px', margin: '4px 60px'}}></p>
            </WriterItem>
            <WriterItem>
              <a className="avator" style={{background: '#ccc', borderRadius: '50%'}}>
              </a>
              <a href="" className="name" style={{background: '#ccc', width: '60px', margin: '0 60px', height: '15px'}}>
              </a>
              <p className="desc" style={{background: '#ccc', width: '150px', height: '16px', margin: '4px 60px'}}></p>
            </WriterItem>
          </WriterWrapper>
          <FindAll>查看全部 ></FindAll>
        </HomeRight>
      </HomeWrapper>
    
  )
}

const LoadableComponent = Loadable({
  loader: () => import('./index.jsx'),
  loading: () => <Loading/>,
});


export default () => {
  return <LoadableComponent/>;
}
