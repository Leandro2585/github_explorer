import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
    font-size: 45px;
    color: #3a3a3a;
    max-width: 430px;
    margin-top: 80px;
    line-height: 56px;
`;
export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    border: 2px solid #fff;
    border-right: 0;
    ${(props) =>
      props.hasError &&
      css`
      border-color: #c53030;
      `}
    &::placeholder{
      color: #a8a8d3;
    }
  }
  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #f8f8f2;
    font-weight: bold;
    transition: background-color .2s;
    &:hover{
      background: ${shade(0.2, '#04d361')}
    }
  }
`;
export const Error = styled.span`
  display:block;
  color: #c53030;
  margin-top: 8px;
`;
export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;
  a {
    border: 1px solid rgba(0,0,0,0.05);
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    & + a {
      margin-top: 16px;
    }
    &:hover {
      transform: translateX(10px);
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      flex: 1;
      margin:0 16px;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
      svg {
        margin-left: auto;
        color: #a8a8b3;
      }
    }
  }
`;
