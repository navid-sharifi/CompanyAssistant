function ChanelRand(): number {
    return Math.floor(Math.random() * (256 + 1));
}

function rgbRand(): number[] {
    return [ChanelRand(), ChanelRand(), ChanelRand()];
}

function rgbToHex(rgb: number[]): string {
    return ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function colorRand(): string {
    return rgbToHex(rgbRand());
}

export const RandomColor = () => '#' + colorRand();