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
//TODO: Оставить в theme свойства типографики (fontFamily, fontSize, lineHeight, letterSpacing, базовая расцветка).
//Свойства позиционирования задать локально. Кроме button - это неизменный лейаут.
export const theme = {
  COLOR_CONFIG_EMOJI,
  typography: {
    h1: {
      fontFamily: 'NEXTART-Bold', //fontNextArtBold
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 1,
      color: '#473C33', //colorBrown
    },
    h2: {
      fontFamily: 'NEXTART', //fontNextArtRegular
      fontSize: 16,
      color: '#473C33', //colorBrown
    },
    body: {
      fontFamily: 'Cygre-Regular',
      color: '#473C33', //colorBrown
      fontSize: 16,
    },
    date: {
      fontFamily: 'Cygre-Regular',
      // textAlign: 'center',
      color: '#473C33', //colorBrown
    },
    description: {
      fontFamily: 'Cygre-Bold',
      fontSize: 18,
      color: '#473C33', //colorBrown
    },
    button: {
      fontFamily: 'Cygre-Bold',
      fontSize: 16,
      color: '#473C33',
      textAlign: 'center',
    },
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
  shadowStyle: {
    // NOTE: для iOS. Контейнер с свойством overflow: 'hidden', должен быть внутри shadowStyle
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  colorGrey: '#8E9AAF',
  colorGreen: '#ABC270',
  colorPaleGreen: '#fff3dd',
  colorYellow: '#FEC868',
  colorPaleYellow: '#e4ebd0',
  colorOrange: '#FDA769',
  colorBlack: '#000000c5',
  colorBrown: '#473C33',
  colorWhite: '#fff',
  colorWhiteHeat: '#fbf7ef',
  colorBlue: '#1D84B5',

  fontCygreBold: 'Cygre-Bold',
  fontCygreRegular: 'Cygre-Regular',
  fontCygreLight: 'Cygre-Light',
  fontNextArtBold: 'NEXTART-Bold',
  fontNextArtRegular: 'NEXTART',
  fontNextArtLight: 'NEXTART-Light',
};

export type TypographyVariant = keyof typeof theme.typography;
