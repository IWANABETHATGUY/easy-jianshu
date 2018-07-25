import Loadable from 'react-loadable';
import React from 'react';
import {
  WriteArticleWrapper
} from './style';
import ReactPlaceholder from 'react-placeholder';

const Loading = () => {
  return (
    <WriteArticleWrapper>
      <ReactPlaceholder type="rect"  style={{width: '150px', height: '50px', margin: '30px 0 10px 0' , padding: '0 16px', borderRadius: '24px'}} ready={false} showLoadingAnimation={true}>
        {''}
      </ReactPlaceholder>
      <ReactPlaceholder type="text" rows={1} style={{width: '100%', padding: '0 20px' , margin: '10px 0'}} ready={false} showLoadingAnimation={true}>
        {''}
      </ReactPlaceholder>
      <ReactPlaceholder type="rect"  style={{width: '100%', height: '600px', padding: '0 20px'}} ready={false} showLoadingAnimation={true}>
        {''}
      </ReactPlaceholder>
    </WriteArticleWrapper>
    
  )
}

const LoadableComponent = Loadable({
  loader: () => import('./index.jsx'),
  loading: () => <Loading/>,
});


export default () => {
  return <LoadableComponent/>;
}
