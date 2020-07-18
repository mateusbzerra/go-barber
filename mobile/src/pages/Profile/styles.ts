import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px;
`;
export const BackButton = styled.TouchableOpacity`
  margin-top: 30px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 20px;
  margin: 24px 0 24px;
`;
export const UserAvatarButton = styled.TouchableOpacity``;
export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  margin-top: 64px;
  align-self: center;
`;
