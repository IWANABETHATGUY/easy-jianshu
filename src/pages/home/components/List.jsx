import React, { Component } from 'react';
import { 
  ListItem, 
  ListInfo, 
  ListMeta
} from '../style';
import LoadMoreBox from './LoadMoreBox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class List extends Component {
  
  render() {
    const { articleList, isLoading, hasMore } = this.props;
    return (
      <div>
        {
          articleList.map((item, index) => {
            return (
              <ListItem
              key={index}>
                {
                  item.picUrl ? 
                  <img
                    alt=""
                    src={item.picUrl}
                    className="pic" /> :
                  null
                }
                <ListInfo>
                  <Link to={`/detail/${item._id}`}>
                    <h3
                      className="title"
                    >
                      {item.title}
                  </h3>
                  </Link>
                  
                  <p
                    className="desc"
                  >
                    {item.summary}
                  </p>
                  <ListMeta>
                    <a className="author">{item.pseudonym}</a>
                    <a className="comment">
                      <i className="iconfont">&#xe719;</i>
                      {item.comment}
                    </a>
                    <span className="like">
                      <i className="iconfont">&#xe701;</i>
                      {item.like}
                    </span>
                  </ListMeta>
                </ListInfo>
              </ListItem>
            )
          })
        }
        <LoadMoreBox
          {...{isLoading, hasMore}}
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  articleList: state.home.articleList
})

export default connect(mapStateToProps, null)(List);