import styled from 'styled-components';

export const LoginWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #eee;
  & .error {
    color: red;
  }
`

export const LoginBox = styled.div`
  width: 400px;
  height: 400px;
  margin: 80px auto;
  padding-top: 20px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`



export const TabList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-bottom: 20px;
`

export const TabListItem = styled.a`
  display: inline-block;
  margin: 0 10px;
  position: relative;
  font-weight: 700px;
  color: #969696;
  font-size: 18px;
  &.active {
    color: #ea6f5a;
    border-bottom: 2px solid #ea6f5a;
  }
  &:hover {
    border-bottom: 2px solid #ea6f5a;
  }
`
export const TabPageBox = styled.div`
  overflow: hidden;
  height: 300px;
  width: 400px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: start;
`
export const TabPageWrapper = styled.div`
  display: flex;
  transition: all 0.3s ease-in-out;
  height: 100%;
  width: 10000px;
`

export const TabPage = styled.div`
  display: inline-block;
  width: 400px;
  height: 300px;
`