export const getWindowWidth = () => window.innerWidth;
export const getWindowHeight = () => window.innerHeight;
export const getWindowRatio = () => window.innerWidth / window.innerHeight;
export const getWindowDimensions = () => ({
  width: getWindowWidth(),
  height: getWindowHeight(),
});
