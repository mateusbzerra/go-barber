import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;
export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 24px;
  margin: 64px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-top-color: #232129;
  padding: 40px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
