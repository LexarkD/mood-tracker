// NOTE: единый цетовой интерфейс для emoji, charts, legends
const COLOR_CONFIG_EMOJI = {
  awesome: 'rgb(96, 178, 85)',
  happy: 'rgba(178,214,28,1)',
  neutral: 'rgba(239,221,7,1)',
  sad: 'rgb(245, 156, 47)',
  terrible: 'rgb(240, 105, 1)',

  cheerful: 'rgb(43, 147, 251)',
  norm: 'rgb(42, 114, 231)',
  sleepy: 'rgb(76, 68, 192)',
};

export const theme = {
  COLOR_CONFIG_EMOJI,
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
  сolorPaleYellow: '#e4ebd0',
  colorOrange: '#FDA769',
  colorBrown: '#473C33',
  colorWhite: '#fff',
  colorWhiteHeat: '#fbf7ef',
  colorBlue: '#1D84B5',

  fontFamilyBold: 'Kalam-Bold',
  fontFamilyRegular: 'Kalam-Regular',
  fontFamilyLight: 'Kalam-Light',
  fontCygreBold: 'Cygre-Bold',
  fontCygreRegular: 'Cygre-Regular',
  fontCygreLight: 'Cygre-Light',
  fontNextArtBold: 'NEXTART-Bold',
  fontNextArtRegular: 'NEXTART',
  fontNextArtLight: 'NEXTART-Light',
};
