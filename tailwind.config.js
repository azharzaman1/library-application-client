const { palette } = require("./src/theming/palette.js");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: palette.primary,
        primaryDark: palette.primaryDark,
        primaryLight: palette.primaryLight,
        secondary: palette.secondary,
        secondaryDark: palette.secondaryDark,
        secondaryLight: palette.secondaryLight,

        primaryText: palette.primaryText,
        secondaryText: palette.secondaryText,
        infoText: palette.infoText,

        dividerColor: palette.dividerColor,

        borderColor: palette.borderColor,

        backgroundV1: palette.backgroundColor1,
        backgroundV2: palette.backgroundColor2,
        backgroundContrast: palette.backgroundContrastColor,

        success: palette.success,
        warning: palette.warning,
        error: palette.error,
        info: palette.info,
      },
      fontSize: {
        xs: "11px",
        sm: "13px",
        base: "15px",
        lg: "1.125rem",
        xl: "1.25rem",
      },
    },
    fontFamily: {
      sans: ["Inter", "Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
