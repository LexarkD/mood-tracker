// NOTE: единый цетовой интерфейс для emoji, charts, legends
const COLOR_CONFIG_EMOJI = {
  great: 'rgb(96, 178, 85)',
  happy: 'rgba(178,214,28,1)',
  neutral: 'rgba(239,221,7,1)',
  sad: 'rgb(245, 156, 47)',
  awful: 'rgb(240, 105, 1)',

  cheerful: 'rgb(43, 147, 251)',
  norm: 'rgb(42, 114, 231)',
  sleepy: 'rgb(76, 68, 192)',
};
const COLOR_CONFIG_UI = {
  screenBackground: '#ABC270',
  cardBackground: '#fff',
  tabBarActive: '#473C33',
  tabBarInactive: '#8E9AAF',
  appText: '#473C33',
  button: '#FEC868',
  buttonIsPressed: '#FDA769',
  oddItemZebra: '#fbf7ef',
  evenItemZebra: '#fff',
};

// NOTE: для iOS. Контейнер с свойством overflow: 'hidden', должен быть внутри shadowStyle
const SHADOW = {
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
};

export const theme = {
  COLOR_CONFIG_UI,
  COLOR_CONFIG_EMOJI,
  SHADOW,
  typography: {
    h1: {
      fontFamily: 'NEXTART-Bold',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 1,
      color: COLOR_CONFIG_UI.appText,
    },
    h2: {
      fontFamily: 'NEXTART',
      fontSize: 16,
      lineHeight: 20,
      color: COLOR_CONFIG_UI.appText,
    },
    body: {
      fontFamily: 'Cygre-Regular',
      fontSize: 16,
      lineHeight: 20,
      color: COLOR_CONFIG_UI.appText,
    },
    date: {
      fontFamily: 'Cygre-Regular',
      fontSize: 14,
      lineHeight: 20,
      color: COLOR_CONFIG_UI.appText,
    },
    description: {
      fontFamily: 'Cygre-Bold',
      fontSize: 18,
      lineHeight: 20,
      color: COLOR_CONFIG_UI.appText,
    },
    button: {
      fontFamily: 'Cygre-Bold',
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      color: COLOR_CONFIG_UI.appText,
    },
  } as const,

  appButton: {
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 160,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLOR_CONFIG_UI.button,
    ...SHADOW,
  } as const,

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },

  iconSize: {
    small: 30,
    medium: 40,
    large: 50,
  },
};

// My fonts:
//   fontCygreBold: 'Cygre-Bold',
//   fontCygreRegular: 'Cygre-Regular',
//   fontCygreLight: 'Cygre-Light',
//   fontNextArtBold: 'NEXTART-Bold',
//   fontNextArtRegular: 'NEXTART',
//   fontNextArtLight: 'NEXTART-Light',

export type TypographyVariant = keyof typeof theme.typography;
