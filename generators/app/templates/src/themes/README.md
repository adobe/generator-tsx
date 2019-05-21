# Themes

This folder contains a folder for each theme. Each theme can define any number
of colors, which are not meant to be used directly, but can be referenced by
more semantic color names like `backgroundColor`.

## Example

```ts
import Theme from 'models/Theme'

const colors = {
	alabaster: '#f8f8f2',
	blackRock: '#282a36',
	malibu: '#61dafb',
}

const darkTheme: Theme = {
	backgroundColor: colors.blackRock,
	foregroundColor: colors.alabaster,
	linkColor: colors.malibu,
}

export default darkTheme
```

## Color names

The name of a color can be found by using an online tool, such as
[Color Name & Hue](https://www.color-blindness.com/color-name-hue/) or
[Name that Color](http://chir.ag/projects/name-that-color/). Pick your favorite
catchy name!
