import styled from "styled-components/native";
import { scale } from "./scale";

export const H1 = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.h1) + "px"};
  font-family: ${(props) => props.theme.fonts.logo};
  font-weight: ${(props) => props.theme.fontWeights.logo};
  color: ${(props) => props.theme.colors.c1};
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
  color: ${(props) => props.theme.colors.c1};
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
  text-decoration: underline;
  text-decoration-style: dotted;
`;

export const TimeText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.body) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
`;

export const TagssText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.caption) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
  background-color: ${(props) => props.theme.colors.c4};
  border-radius: ${(props) => scale(props.theme.space[2]) + "px"};
  padding: ${(props) => scale(props.theme.space[0]) + "px"}
    ${(props) => scale(props.theme.space[1]) + "px"};
  flex-wrap: wrap;
  flex-shrink: 1;
  margin-right: ${(props) => scale(props.theme.space[0]) + "px"};
`;

export const BodyText = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.body) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
`;

export const Input = styled.TextInput`
  font-size: ${(props) => scale(props.theme.fontSizes.button) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
  background-color: ${(props) => props.theme.colors.inverse};
  border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
  padding: ${(props) => scale(props.theme.space[1]) + "px"}
    ${(props) => scale(props.theme.space[2]) + "px"};
  margin: ${(props) => scale(props.theme.space[1]) + "px"};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.c4};
  flex-shrink: 1;
  flex-grow: 1;
`;
