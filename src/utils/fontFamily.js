import {fontFamilies} from '../constants/fonts';

export const getFontFamily = (
  isLTR,
  weight,
) => {
  const selectedFontFamily = isLTR
    ? fontFamilies.MONTSERRAT
    : fontFamilies.RUBIK;
  return selectedFontFamily[weight];
};