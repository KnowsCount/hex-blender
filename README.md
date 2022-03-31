# hex-blender

> a library for finding out the hex value between two hex values.

## 🤤 usage

to install the library as a dependency to your project, run

```bash
yarn add hex-blender
# or, according to your preference
npm install hex-blender
```

import the library in your project like below, and you can get started using it directly.

```ts
// simply import the library
import hexBlend from 'hex-blender'
// and then ... just use it like you would any library
const getMiddleColour = (colourOne, colourTwo) => {
	return hexBlend(colourOne, colourTwo, 4, 2)
}
// adding `#` or not is optional
getMiddleColour('ff0000', '#00ff00') // '#7f7f00'
```
