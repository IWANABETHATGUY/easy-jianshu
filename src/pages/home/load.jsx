import Loadable from 'react-loadable';
import React from 'react';
const LoadableComponent = Loadable({
  loader: () => import('./index.jsx'),
  loading: () => <div>loading</div>,
});


export default () => {
  return <LoadableComponent/>;
}
