import React, { Component, Fragment } from 'react';
import {
  WriterWrapper,
  WriterList,
  WriterItem
} from '../style';
import { connect } from 'react-redux'; 

class Writer extends Component {
  render() {
    const { writerList } = this.props;
    return (
      <div>
        <WriterWrapper>
          <div className="meta">
            <span className="title">推荐作者</span>
            <a className="another" href="/">
              <i className="iconfont spin">&#xe851;</i>
              换一批
            </a>
          </div>
          <WriterList>
            
            {
              writerList.length > 0 ? 
              writerList.map((item, index) => {
                return (
                  <WriterItem
                    key={index}
                  >
                    <a className="avator">
                      <img src={item.avator}
                        alt={item.name} />
                    </a>
                    <a href="/" className="notice">
                      +关注
                    </a>
                    <a href="" className="name">
                      {item.name}
                    </a>
                    <p className="desc">{item.desc}</p>
                  </WriterItem>
                )
              }) : this.skeletonRender()
            }
            
          </WriterList>
        </WriterWrapper>
      </div>
    );
  }

  skeletonRender = () => {
    return (
      <Fragment>
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
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  writerList: state.home.writerList
})
export default connect(mapStateToProps, null)(Writer);