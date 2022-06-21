import styled from "styled-components/native";
import { Dropdown } from "react-native-element-dropdown";
import { scale } from "./scale";

export const H1 = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.h1) + "px"};
  font-family: ${(props) => props.theme.fonts.logo};
  font-weight: ${(props) => props.theme.fontWeights.logo};
  color: ${(props) => props.theme.colors.white};
`;

export const H2 = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.h2) + "px"};
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.c1};
`;

export const H3 = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.h3) + "px"};
  font-family: ${(props) => props.theme.fonts.medium};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.c2};
  flex-wrap: wrap;
  flex-shrink: 1;
`;

export const ProjectText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.title) + "px"};
  font-family: ${(props) => props.theme.fonts.medium};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.c1};
  flex-wrap: wrap;
  flex-shrink: 1;
`;

export const TotalTimeText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.title) + "px"};
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.c3};
`;

export const CategoryText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.body) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c3};
`;

export const TimeText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.body) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
`;

export const TagsView = styled.View`
  background-color: ${(props) => props.theme.colors.c4};
  border-radius: ${(props) => scale(props.theme.space[4]) + "px"};
  padding: ${(props) => scale(props.theme.space[2]) + "px"}
    flex-direction: row
  flex-shrink: 1;
  margin-right: ${(props) => scale(props.theme.space[1]) + "px"};
    margin-bottom: ${(props) => scale(props.theme.space[1]) + "px"};
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const TagssText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.caption) + "px"};
  font-family: ${(props) => props.theme.fonts.medium};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.c2};
  text-transform: uppercase;
`;

export const TagsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  flex-wrap: wrap;
  padding: 10px;
  align-items: center;
`;

export const BodyText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.body) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
`;

export const Input = styled.TextInput`
  font-size: ${(props) => scale(props.theme.fontSizes.button) + "px"};

  font-weight: ${(props) => props.theme.fontWeights.light};

  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
  padding: ${(props) => scale(props.theme.space[3]) + "px"};
  margin: ${(props) => scale(props.theme.space[1]) + "px"};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.c4};
  flex-grow: 1;
`;

export const SessionCard = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  margin: ${(props) => scale(props.theme.space[0]) + "px"}
    ${(props) => scale(props.theme.space[1]) + "px"};
  border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
  padding: ${(props) => scale(props.theme.space[1]) + "px"};
  flex-direction: row;
  align-content: center;
  border-width: 1px;
  border-color: #dedede;
`;

export const SessionCardText = styled.View`
  padding-left: ${(props) => scale(props.theme.space[2]) + "px"};
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const DashboardCard = styled.View`
  flex:1; 
  margin: ${(props) => scale(props.theme.space[2]) + "px"}
  border-radius: ${(props) => scale(props.theme.space[3]) + "px"};
  padding: ${(props) => scale(props.theme.space[4]) + "px"};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : props.theme.colors.white};

    shadow-color: #000;
shadow-offset: 0px 2px;
shadow-opacity: 0.25;
shadow-radius: 5px;
elevation: 20;
`;

export const DropdownStyled = styled(Dropdown)`
  font-size: ${(props) => scale(props.theme.fontSizes.button) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
  padding: ${(props) => scale(props.theme.space[2]) + "px"};
  margin: ${(props) => scale(props.theme.space[1]) + "px"};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.c4};
  flex-grow: 1;
  height: ${scale(40) + "px"};
`;
