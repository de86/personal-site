import Themes from '../enums/themes';

export function getTheme () {
    const themes = Object.values(Themes);
    const randomIndex = Math.floor(Math.random() * themes.length);
    const theme = themes[randomIndex];
    console.log(theme)

    return theme 
}
