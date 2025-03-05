import type { ThemeConfig } from "antd";

const appTheme: ThemeConfig = {
  token: {
    fontFamily: "IranSans",
    colorPrimary: "#C7274B",
    colorInfo: "#923468",
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: "#C7274B",
    //   colorPrimaryHover: "#a71f3e",
      colorPrimaryActive: "#8c1a36",
      colorTextLightSolid: "#FFFFFF",
      borderRadius: 100,
      controlHeight: 60, 
      fontSize: 16, 
      fontWeight: 300, 
    },
  },
};

export default appTheme;