import Loadable from 'react-loadable';
import React from 'react';
import {
  DetailWrapper,
  Header
} from './style';
import ReactPlaceholder from 'react-placeholder';

const Loading = () => {
  return (
    <DetailWrapper>
      <Header>
        <ReactPlaceholder type="rect" style={{width: '100px', height: '50px', margin: '0 auto'}} ready={false} showLoadingAnimation={true}>
          {''}
        </ReactPlaceholder>
      </Header>
      <ReactPlaceholder type="rect"  style={{width: '100%', height: '400px'}} ready={false} showLoadingAnimation={true}>
        {''}
      </ReactPlaceholder>
      <ReactPlaceholder type="text"  rows={10} ready={false} showLoadingAnimation={true}>
        {''}
      </ReactPlaceholder>
    </DetailWrapper>
    
  )
}

const LoadableComponent = Loadable({
  loader: () => import('./index.jsx'),
  loading: () => <Loading/>,
});


export default () => {
  return <LoadableComponent/>;
}
