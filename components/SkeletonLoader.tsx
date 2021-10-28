import React, { useContext, useEffect } from "react";

import Constants from "expo-constants";
import { View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import ContentLoader, { Rect, Circle } from "react-content-loader/native";

export default function SkeletonLoader() {
  const colorScheme = useColorScheme();

  return (
    // <ContentLoader viewBox="0 0 380 70">
    //   <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    //   <Rect x="80" y="0" rx="4" ry="4" width="300" height="70" />
    // </ContentLoader>
    <ContentLoader
      height={200}
      speed={1}
      backgroundColor={"#003399"}
      foregroundColor={"#003cb3"}
      viewBox="0 0 380 70"
    >
      {/* Only SVG shapes */}
      <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      <Rect x="0" y="80" rx="5" ry="5" width="70" height="70" />
      <Rect x="80" y="0" rx="4" ry="4" width="300" height="70" />
      <Rect x="80" y="80" rx="4" ry="4" width="300" height="70" />
    </ContentLoader>
  );
}
