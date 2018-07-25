import Loadable from 'react-loadable';
import React from 'react';
import {
  LoginWrapper,
  LoginBox,
  TabList,
  TabPage,
  TabPageBox,
  TabPageWrapper,
} from './style';
import ReactPlaceholder from 'react-placeholder';

const Loading = () => {
  return (
    <LoginWrapper>
      <LoginBox>
        <TabList>
          <ReactPlaceholder type="rect" style={{width: '200px', height: '30px', margin: '10px auto'}} ready={false} showLoadingAnimation={true}>
            {''}
          </ReactPlaceholder>
        </TabList>
        <TabPageBox className="box">
          <TabPageWrapper>
            <TabPage>
              <ReactPlaceholder type="rect" style={{width: '200px', height: '30px', margin: '10px auto'}} ready={false} showLoadingAnimation={true}>
                {''}
              </ReactPlaceholder>
              <ReactPlaceholder type="rect" style={{width: '200px', height: '30px', margin: '10px auto'}} ready={false} showLoadingAnimation={true}>
                {''}
              </ReactPlaceholder>
              <ReactPlaceholder type="rect" style={{width: '220px', height: '30px', margin: '20px auto', borderRadius: '15px'}} ready={false}
                showLoadingAnimation={true}>
                {''}
              </ReactPlaceholder>

            </TabPage>

          </TabPageWrapper>
        </TabPageBox>

      </LoginBox>
    </LoginWrapper>

    
  )
}

const LoadableComponent = Loadable({
  loader: () => import('./index.jsx'),
  loading: () => <Loading/>,
});


export default () => {
  return <LoadableComponent/>;
}
