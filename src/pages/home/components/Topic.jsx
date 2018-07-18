import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {
  TopicWrapper,
  TopicItem
} from '../style';
class Topic extends Component {
  
  render() {
    const { picList } = this.props;
    return (
      <div>
        <TopicWrapper>
          {
            picList.map((item, index) => (
              <TopicItem
                key={index}
              >
                <img 
                  alt={item.picName}
                  src={item.picUrl}
                  className="topic-pic"
                /> 
                {item.picName}
              </TopicItem>
            ))
          }
          
          
        </TopicWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    picList: state.home.picList
  }
}

export default connect(mapStateToProps, null)(Topic);