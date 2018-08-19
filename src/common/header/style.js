import styled from 'styled-components';
import logoPic from '../../static/logo.png';

export const HeaderWrapper = styled.div`
position: fixed;
z-index: 999;
width: 100%;
top: 0;
height: 58px;
border-bottom: 1px solid #f0f0f0;
background: #fff;
box-sizing: border-box;
`
export const HeaderBox = styled.div`
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
`

export const Logo = styled.div`
  float: left;
  width: 100px;
  height: 56px;
  background: url(${logoPic});
  background-size: contain;
`

export const Nav = styled.div`
  width: 960px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`

export const NavItem = styled.div`
  height: 100%;
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  cursor: pointer;
  &.left {
    float: left;
  }
  &.right {
    float: right;
    color: #969696;
  }

  & .iconfont.menu {
    font-size: 20px;
  }
  &.active {
    color: #ea6f5a;
  }
  &.download:hover {
    background: #ccc;
  }
`

export const NavSearch = styled.input.attrs({
  placeholder: '搜索'
})`
  width: 200px;
  height:38px;
  margin: 9px 0 0 20px ;
  padding: 0 35px 0 20px;
  font-size: 14px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #f0f0f0;
  transition: all 200ms linear;
  &.focused {
    width: 300px;
  }
  &.focused + .iconfont {
    background: #ccc;
  }
`

export const SearchInfo = styled.div`
  position: absolute;
  left: 0;
  top: 56px;
  width: 240px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 0 20px;
  margin-left: 20px;
  background: #fff;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -10px;
    left: 20px;
    height: 0;
    border-bottom: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  }
`
export const SearchInfoTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
  user-select: none;
  cursor: pointer;
`

export const SearchInfoSwitch = styled.span`
  float: right;
  font-size: 13px;
  .spin {
    float: left;
    font-size: 12px;
    margin-right: 2px;
    transform: rotate(0deg);
    transform-origin: center center;
    transition: all 0s ;
    
  }
  .active {
    transform: rotate(360deg);
    transition: all .2s ease-in-out;
  }
`

export const SearchInfoItem = styled.a`
  display: inline-block;
  line-height: 20px;
  padding: 0 5px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #969696;
  margin-right: 10px;
  margin-bottom: 15px;
  border-raduis: 2px;
`

export const Button = styled.a`
  float: right;
  margin: 9px 20px 0 0;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;
  &.register {
    color: #ec6149;
  }
  &.write-article{
    color: #fff;
    background: #ec6149;
  }
`
export const WriteArticle = styled.div`
  float: right;
  margin: 9px 20px 0 0;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;
  color: #fff;
  background: #ec6149;

`

export const NavSearchWrapper = styled.div`
  position: relative;
  float: left;
  .theme {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
  }
  
`

export const AvatorContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  height: 56px;
  width: 88px;
  user-select: none;
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  &:hover {
    background: #f5f5f5;
  }
  &:hover > .drop-list {
    display: block;
  }
  .drop-list {
    position: absolute;
    z-index: 999;
    top: 95%;
    left: 0px;
    background: #fff;
    display: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    margin: 2px 0 0;
    min-width: 160px;
  }
  .drop-list-item {
    padding-left:40px;
    font-size: 14px;
    font-weight: 400;
    color: #222;
    height: 30px;
    line-height: 30px;
    &:hover {
      background: #f5f5f5;
    }
  }
`
