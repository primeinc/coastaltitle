// Colors
import colors from 'vuetify/lib/util/colors';

const palette = {
  oceanBlue: {
    primary: colors.blue.base, // primary main
    primarylight: colors.blue.lighten4, // primary light
    primarydark: colors.blue.darken4, // primary dark
    secondary: colors.cyan.base, // secondary main
    secondarylight: colors.cyan.lighten4, // secondary light
    secondarydark: colors.cyan.darken4, // secondary dark
    anchor: colors.blue.base, // link
  },
};

const theme = {
  ...palette.oceanBlue,
};

export default theme;
