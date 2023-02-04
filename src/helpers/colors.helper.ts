import type { PokemonColors } from "../api/pokemon"

export const hexToHsl = (hex: string): PokemonColors => {
  // Convert hex to RGB first
  let r = 0
  let g = 0
  let b = 0

  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1])
    g = parseInt("0x" + hex[2] + hex[2])
    b = parseInt("0x" + hex[3] + hex[3])
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2])
    g = parseInt("0x" + hex[3] + hex[4])
    b = parseInt("0x" + hex[5] + hex[6])
  }

  // Then convert the RGB to HSL
  r /= 255
  g /= 255
  b /= 255

  let cmin = Math.min(r, g, b)
  let cmax = Math.max(r, g, b)
  let delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) {
		h = 0
	} else if (cmax === r) {
		h = ((g - b) / delta) % 6
	} else if (cmax === g) {
		h = (b - r) / delta + 2
	} else {
		h = (r - g) / delta + 4
	}

  h = Math.round(h * 60)

  if (h < 0) {
		h += 360
	}

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return {
    colorLight: `hsl(${h}, ${s}%, ${Math.min(100, l + 3)}%)`,
    colorDefault: `hsl(${h}, ${s}%, ${l}%)`,
    colorDark: `hsl(${h}, ${s}%, ${Math.max(0, l - 3)}%)`
  }
}

const colorPalettes = {
  Normal: {
    colorLight: "#a4acaf",
    colorDefault: "#9fa4aa",
    colorDark: "#6b717c"
  },
  Fighting: {
    colorLight: "#d56723",
    colorDefault: "#d56723",
    colorDark: "#a54e17"
  },
  Flying: {
    colorLight: "#3dc7ef",
    colorDefault: "#3dc7ef",
    colorDark: "#1e90ff"
  },
  Poison: {
    colorLight: "#b97fc9",
    colorDefault: "#b97fc9",
    colorDark: "#a552a0"
  },
  Ground: {
    colorLight: "#d3b357",
    colorDefault: "#d3b357",
    colorDark: "#b79b50"
  },
  Rock: {
    colorLight: "#a38c21",
    colorDefault: "#a38c21",
    colorDark: "#9b8b2c"
  },
  Bug: {
    colorLight: "#729f3f",
    colorDefault: "#729f3f",
    colorDark: "#4e8234"
  },
  Ghost: {
    colorLight: "#7b62a3",
    colorDefault: "#7b62a3",
    colorDark: "#6b54a3"
  },
  Steel: {
    colorLight: "#9eb7b8",
    colorDefault: "#9eb7b8",
    colorDark: "#787887"
  },
  Fire: {
    colorLight: "#fd7d24",
    colorDefault: "#fd7d24",
    colorDark: "#fd7d24"
  },
  Water: {
    colorLight: "#4592c4",
    colorDefault: "#4592c4",
    colorDark: "#3182bd"
  },
  Grass: {
    colorLight: "#9bcc50",
    colorDefault: "#8bbe3f",
    colorDark: "#3e9b2e"
  },
  Electric: {
    colorLight: "#eed535",
    colorDefault: "#eed535",
    colorDark: "#eed535"
  },
  Psychic: {
    colorLight: "#f366b9",
    colorDefault: "#f366b9",
    colorDark: "#ee5b9d"
  },
  Ice: {
    colorLight: "#51c4e7",
    colorDefault: "#51c4e7",
    colorDark: "#47b1e0"
  },
  Dragon: {
    colorLight: "#53a4cf",
    colorDefault: "#53a4cf",
    colorDark: "#498bcd"
  },
  Dark: {
    colorLight: "#707070",
    colorDefault: "#707070",
    colorDark: "#707070"
  },
  Fairy: {
    colorLight: "#fdb9e9",
    colorDefault: "#fdb9e9",
    colorDarkcolorDark: "#e89ad9"
  }
}

export type PokemonTypeColorPaletteKey = keyof typeof colorPalettes

export const getColorPaletteFromType = (type: PokemonTypeColorPaletteKey): PokemonColors => colorPalettes[type] as PokemonColors

export const AllPokemonTypes: string[] = Object.keys(colorPalettes)
