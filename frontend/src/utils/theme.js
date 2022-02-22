import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

const buttonHeight = '38px'
const borderRadiusRound = '19px'
const bgLight = '#fff'
const bgHoverLight = '#f2f2f2'
export const headerHeight = '60px'
export const scrolledHeaderHeight = '84px'

const initTheme = darkMode =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3DBEFF',
      },
      secondary: {
        main: '#FDD14D',
      },
      info: {
        main: '#2D9CDB',
      },
      canary: {
        main: '#F2F758',
      },
      chestnutRose: {
        main: '#C95F6D',
      },
      ultramarine: {
        main: '#081181',
      },

      ...(!darkMode
        ? {
            // palette values for light mode
            text: {
              primary: '#333333',
              secondary: grey[800],
            },
            background: { default: '#fff' },
          }
        : {
            // palette values for dark mode
            text: {
              primary: '#fff',
              secondary: '#fff',
            },
            background: {
              default: grey[900],
              paper: grey[900],
            },
          }),
    },

    typography: {
      sectionTitle: {
        fontWeight: 700,
        fontSize: `1rem`,
        lineHeight: 1.2,
        marginBottom: `0.875rem`,
      },
      fieldLabel: {
        fontSize: '0.875rem',
        marginBottom: '0.25rem',
        lineHeight: '1rem',
      },
      fieldValue: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.25,
      },
    },

    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          containedPrimary: {
            ':hover': {
              backgroundColor: '#36ABE5',
            },
          },
          root: {
            whiteSpace: 'nowrap',
            height: buttonHeight,
            borderRadius: borderRadiusRound,
            boxShadow: 'none',
            textTransform: 'none',
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            fontSize: '24px',
            color: !darkMode && '#333',
          },
          li: {
            fontWeight: 'bold',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          clearIndicator: {
            color: darkMode ? '#666666' : '#2D2D2D',
          },
          input: {
            paddingTop: '0 !important',
            paddingBottom: '0 !important',
          },
          endAdornment: {
            top: 'initial',
          },
          inputRoot: {
            height: buttonHeight,
            backgroundColor: `${darkMode ? bgLight : '#f2f2f2'} !important`,
            borderRadius: borderRadiusRound,
            overflow: 'hidden',
            paddingTop: '0',
            paddingBottom: '0',
            '&:hover': {
              backgroundColor: `${bgHoverLight} !important`,
            },
            '&:before': {
              content: 'none',
            },
            '&:after': {
              content: 'none',
            },
          },
          inputFocused: {
            backgroundColor: 'transparent',
          },
          popper: {
            marginTop: '12px !important',
          },
          paper: {
            borderRadius: borderRadiusRound,
          },
          listbox: {
            backgroundColor: bgLight,
          },
          option: {
            backgroundColor: bgLight,
            color: darkMode ? '#666666' : '#2D2D2D',
            '&:hover': {
              backgroundColor: bgHoverLight,
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          input: {
            paddingTop: '0',
            paddingBottom: '0',
            height: buttonHeight,
            color: darkMode ? '#666666' : '#2D2D2D',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: darkMode ? '#666666' : '#2D2D2D',
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            sectionTitle: 'h6',
            fieldValue: 'p',
            fieldLabel: 'p',
          },
        },
        styleOverrides: {
          gutterBottom: {
            marginBottom: `1rem`,
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: '#F2F2F2',
          },
        },
      },

      header: {
        height: headerHeight,
        scrolledHeight: scrolledHeaderHeight,
        paddingX: '14px',
        paddingY: '10px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        bgColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.9)',
        iconColor: darkMode ? '#ffffff' : '#4d4d4d',
        iconHoverColor: darkMode ? '#ffffff' : '#000000',
      },

      searchInput: {
        width: '250px',
      },

      sidebar: {
        width: '300px',
      },
    },
  })

export default initTheme
