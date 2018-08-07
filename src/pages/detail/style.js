import styled from 'styled-components';

export const DetailWrapper = styled.div`
  width: 620px;
  margin: 0 auto;
  padding-bottom: 20px;
  .iconfont.like {
    color: red;
  }
`

export const CommentWrapper = styled.div`
  width: 620px;
  margin: 0 auto;
  padding-bottom: 20px;
`

export const Header = styled.div`
  margin: 50px 0 20px 0;
  line-height: 44px;
  font-size: 34px;
  color: #333;
  font-weight: bold;
  text-align: center;
`
export const Content = styled.div`
  color: #2f2f2f;
  p {
    margin: 25px 0;
    font-weight: 16px;
    line-height: 30px;
  }
`

export const ImgContainer = styled.div`
  max-width: 700px;
  max-height: 445px;
`
export const CommentContainer = styled.div`
  transition: background linear 2s;
  &.tip {
    transition: background linear 0s;
    background: #eee;
  }
`