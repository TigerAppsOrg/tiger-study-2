const FONT_MAP = {
    lato: "Lato, sans-serif",
    spectral: "Spectral, serif"
};

export const loadFont = (fontName: keyof typeof FONT_MAP) => {
    switch (fontName) {
        case "spectral":
            document.documentElement.style.fontFamily = FONT_MAP["spectral"];
            break;
        case "lato":
            document.documentElement.style.fontFamily = FONT_MAP["lato"];
            break;
    }
};

export const toggleFont = () => {
    const currentFont =
        document.documentElement.style.fontFamily || FONT_MAP["spectral"];

    if (currentFont === FONT_MAP["spectral"]) {
        document.documentElement.style.fontFamily = FONT_MAP["lato"];
    } else {
        document.documentElement.style.fontFamily = FONT_MAP["spectral"];
    }
};
