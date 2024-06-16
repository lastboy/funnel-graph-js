const defaultColors = ['#FF4589', '#FF5050',
    '#05DF9D', '#4FF2FD',
    '#2D9CDB', '#A0BBFF',
    '#FFD76F', '#F2C94C',
    '#FF9A9A', '#FFB178'];

const getDefaultColors = (number) => {
    const colors = [...defaultColors];
    const colorSet = [];

    for (let i = 0; i < number; i++) {
        // get a random color
        const index = Math.abs(Math.round(Math.random() * (colors.length - 1)));
        // push it to the list
        colorSet.push(colors[index]);
        // and remove it, so that it is not chosen again
        colors.splice(index, 1);
    }
    return colorSet;
};

export {
    getDefaultColors
};
