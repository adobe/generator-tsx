export default function sentenceCase(value: string) {
	return value.replace(/^[a-z]/, letter => letter.toUpperCase())
}
