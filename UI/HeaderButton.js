import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

export const IoniconsHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton   iconSize={23} {...props} />
);
