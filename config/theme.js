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
  blueGray: {
    primary: '#003366', // Dark blue as primary
    primarylight1: '#003d78', // Lighter blue for highlights or hover
    primarylight: '#6699cc', // Lightest blue for links
    primarydark: '#002244', // Even darker blue, if needed
    secondary: '#ff6600', // Muted orange as secondary
    secondarylight: '#ff8533', // Lighter orange for highlights
    secondarydark: '#cc5200', // Darker orange for buttons, etc.
    anchor: '#003d78', // Link color matching primary light
  },
};

const theme = {
  ...palette.blueGray,
};

export default theme;
