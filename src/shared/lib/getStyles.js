export const getStyles = (style, mode, additional) => {

    const modeStyles = Object.entries(mode)
        .filter(([_, value]) => Boolean(value))
        .map(([key]) => key);

        return [style, ...modeStyles, ...additional].join(' ');
};