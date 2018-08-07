import React, { Fragment } from 'react';
import { LoadMore, LoadingBall } from '../style.js';
const LoadMoreBox = (props) => {
  const { isLoading, hasMore } = props;
  return (
    <Fragment>
      {
        hasMore ? (
          (
            <LoadMore style={{ visibility: isLoading ? 'visible' : 'hidden'}}>
              <div style={{position: 'relative', height: '20px', width: '20px'}}>
                <LoadingBall background="red" delay="-1s"/>
                <LoadingBall background="yellow" delay="-0.5s"/>
                <LoadingBall background="blue" delay="0s"/>
              </div>
            </LoadMore>
          )
        ) : <LoadMore>没有更多了</LoadMore>
      }
      
    </Fragment>
  );
};

export default LoadMoreBox;