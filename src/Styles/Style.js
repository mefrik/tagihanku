import { createTheme } from '@mui/material/styles';

const Colors = {
  primary: "#A66CFF",
  secondary: "#9C9EFE",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  white: "#fff",
  black: "#EEEEEE",
  search: "#A66CFF",
};

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        },
        search: {
            main: Colors.search
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true
            }
        }
    }
});

export default theme;