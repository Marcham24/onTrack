import styled from "styled-components/native";
import { Dropdown } from "react-native-element-dropdown";
import { scale } from "./scale";

export const H1 = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.h1) + "px"};
  font-family: ${(props) => props.theme.fonts.logo};
  font-weight: ${(props) => props.theme.fontWeights.logo};
  color: ${(props) => props.theme.colors.white};
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
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
  padding: ${(props) => scale(props.theme.space[4]) + "px"};
  margin: ${(props) => scale(props.theme.space[1]) + "px"};

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

export const DropdownStyled = styled(Dropdown)`
  font-size: ${(props) => scale(props.theme.fontSizes.button) + "px"};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.c2};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
  padding: ${(props) => scale(props.theme.space[4]) + "px"};
  margin: ${(props) => scale(props.theme.space[1]) + "px"};

  flex-grow: 1;
  height: ${scale(40) + "px"};
`;

export const TimePeriod = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.title) + "px"};
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
`;

export const SView = styled.View`
background-color: ${(props) =>
  props.bg === "c1"
    ? props.theme.colors.c1
    : props.bg === "c2"
    ? props.theme.colors.c2
    : props.bg === "c3"
    ? props.theme.colors.c3
    : props.bg === "c4"
    ? props.theme.colors.c4
    : props.bg === "c5"
    ? props.theme.colors.c5
    : props.bg === "disabled"
    ? props.theme.colors.disabled
    : props.bg === "inverse"
    ? props.theme.colors.inverse
    : props.bg === "danger"
    ? props.theme.colors.danger
    : props.bg === "success"
    ? props.theme.colors.success
    : props.bg === "white"
    ? props.theme.colors.white
    : "none"}
  ${(props) => props.flex && "flex:" + props.flex}
  ${(props) => props.row && "flex-direction: row"}
  ${(props) => props.grow && "flex-grow: 1"}
  ${(props) => props.shrink && "flex-shrink:1"}
  ${(props) =>
    props.br && "border-radius:" + scale(props.theme.space[1]) + "px"};}
  padding-top: ${(props) =>
    props.pt ? scale(props.theme.space[props.pt]) + "px" : "0px"}
  padding-left:   ${(props) =>
    props.pl ? scale(props.theme.space[props.pl]) + "px" : "0px"}
  padding-bottom:   ${(props) =>
    props.pb ? scale(props.theme.space[props.pb]) + "px" : "0px"}
  padding-right:   ${(props) =>
    props.pr ? scale(props.theme.space[props.pr]) + "px" : "0px"}
  ${(props) => props.p && "padding:" + scale(props.theme.space[props.p]) + "px"}
  margin: ${(props) =>
    props.mv ? scale(props.theme.space[props.mv]) + "px" : "0px"}
    ${(props) => (props.mh ? scale(props.theme.space[props.mh]) + "px" : "0px")}
  justify-content: ${(props) =>
    props.justify === "sb"
      ? "space-between"
      : props.justify === "sa"
      ? "space-around"
      : "flex-start"}
  ${(props) =>
    props.shadow &&
    "shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.25; shadow-radius: 5px; elevation: 20;"}

      

  ${(props) => props.z && "z-index:" + props.z}
  ${(props) => props.elevate && "elevation:" + props.elevate}
`;
