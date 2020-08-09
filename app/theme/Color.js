import DarkTheme from './DarkTheme';
import LightTheme from './LightTheme';

let current = localStorage.getItem('theme') || 'LightTheme';
let currentTheme: ColorInterface =
  current === 'LightTheme' ? LightTheme.colors : DarkTheme.colors;

export const toogleTheme = () => {
  if (current === 'LightTheme') {
    localStorage.setItem('theme', 'DarkTheme');
  } else {
    localStorage.setItem('theme', 'LightTheme');
  }
  location.reload();
};

export default currentTheme;
