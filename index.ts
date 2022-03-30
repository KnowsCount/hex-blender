const hexBlend = (
	color1: string,
	color2: string,
	res: number,
	blend: number
) => {
	const wrongChar: RegExp = /[^0-9a-f]/i

	if (
		color1.length !== 6 ||
		color2.length !== 6 ||
		wrongChar.test(color1) ||
		wrongChar.test(color2)
	)
		return -1

	const getColorFromRange = (range: number[], res: number, arg: number) =>
		((range[1] - range[0]) / res) * arg + range[0]

	const [RGB1, RGB2]: any = [color1.match(/.{2}/g), color2.match(/.{2}/g)]

	return [
		~~getColorFromRange(
			[parseInt(RGB1[0], 16), parseInt(RGB2[0], 16)],
			res,
			blend
		),
		~~getColorFromRange(
			[parseInt(RGB1[1], 16), parseInt(RGB2[1], 16)],
			res,
			blend
		),
		~~getColorFromRange(
			[parseInt(RGB1[2], 16), parseInt(RGB2[2], 16)],
			res,
			blend
		),
	]
		.map((el) => el.toString(16).padStart(2, '0'))
		.join('')
}

export default hexBlend
