import { arrayOfKeywords } from "../arrayOfKeywords"

const { useState, useEffect } = require("react")

const useQuery = () => {
	const [query, setQuery] = useState('')
	const [whatDidYouMean, setWhatDidYouMean] = useState([])


	const arrayOfWhatDidYouMean = () => {
		let arrayOfKeys = arrayOfKeywords.reduce((ack, item) => {
			if (item.includes(query.toLowerCase())) {
				ack.push(item);
			}
			return ack
		}, [])
		let set = new Set(arrayOfKeys)
		let array = Array.from(set).slice(0, 5);

		return array
	}

	useEffect(() => {
		query.length < 2 ?
			setWhatDidYouMean([]) :
			arrayOfWhatDidYouMean().length ?
				setWhatDidYouMean(arrayOfWhatDidYouMean()) :
				setWhatDidYouMean([`Sorry, but I don't  found any keys`])
	}, [query])

	return [query, setQuery, whatDidYouMean, setWhatDidYouMean]
}

export default useQuery