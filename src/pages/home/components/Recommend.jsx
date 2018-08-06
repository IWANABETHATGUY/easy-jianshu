import React, { Component } from 'react';
import { RecommendWrapper, RecommendItem } from '../style';
import { connect } from 'react-redux';

class Recommend extends Component {
  render() {
    const { recommendList } = this.props;
    return (
      <RecommendWrapper>
        {
          recommendList.map((item, index) => {
            return (
              <RecommendItem
                key={index}
                src={item.imgUrl}
              >
                
              </RecommendItem>
            )
          })
        }
      </RecommendWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendList: state.home.recommendList
})

export default connect(mapStateToProps, null)(Recommend);