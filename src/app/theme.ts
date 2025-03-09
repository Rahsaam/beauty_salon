import type { ThemeConfig } from "antd";

const appTheme: ThemeConfig = {
  token: {
    fontFamily: "IranSans",
    colorPrimary: "#6F0E37",
    colorInfo: "#923468",
    wireframe: false,
  },
  components: {
    Button: {
      colorBgContainer: '#FFFFF',
      colorBorder: "#6F0E37",
      colorText: '#6F0E37',
      borderRadius: 10,
      controlHeight: 60,
      fontSize: 16,
      fontWeight: 300,
      colorPrimary: '#6F0E37',
      colorPrimaryActive: '#8c1a36',
      colorTextLightSolid: '#FFFFFF',
    },
    Input: {
      colorBorder: "#6F0E37",
      borderRadius: 8,
      controlHeightLG: 52,
    },
    Select: {
      borderRadius: 8,
      controlHeight: 48,
      controlHeightLG: 52,
      fontSize: 16,
      colorText: "#6F0E37",
      colorBgContainer: "#FCF7F9",
      colorBorder: "transparent",
      colorPrimaryHover: "#923468",
      colorPrimaryActive: "#6F0E37",
    },
  },
};

export default appTheme;