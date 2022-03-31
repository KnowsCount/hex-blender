const hexBlend = (
	colour1: string,
	colour2: string,
	res: number,
	blend: number
) => {
	const wrongChar: RegExp = /[^0-9a-f]/i
	const hex: RegExp = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i
	if (hex.test(colour1) && hex.test(colour2)) {
		colour1 = colour1.replace('#', '')
		colour2 = colour2.replace('#', '')
	}
	if (
		colour1.length !== 6 ||
		colour2.length !== 6 ||
		wrongChar.test(colour1) ||
		wrongChar.test(colour2)
	)
		return 'input format is wrong.'

	const getcolourFromRange = (range: number[], res: number, arg: number) =>
		((range[1] - range[0]) / res) * arg + range[0]

	const [RGB1, RGB2]: any = [colour1.match(/.{2}/g), colour2.match(/.{2}/g)]

	return `#${[
		~~getcolourFromRange(
			[parseInt(RGB1[0], 16), parseInt(RGB2[0], 16)],
			res,
			blend
		),
		~~getcolourFromRange(
			[parseInt(RGB1[1], 16), parseInt(RGB2[1], 16)],
			res,
			blend
		),
		~~getcolourFromRange(
			[parseInt(RGB1[2], 16), parseInt(RGB2[2], 16)],
			res,
			blend
		),
	]
		.map((el) => el.toString(16).padStart(2, '0'))
		.join('')}`
}

export default hexBlend
