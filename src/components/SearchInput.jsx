import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSetArrayOfPhotos } from '../Context'
import { arrayOfKeywords } from '../arrayOfKeywords'
import CartOfWDM from './CartOfWDM'

const StyledCartWDM = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`

const StyledInput = styled.div`
border: 1px solid grey;
width: 100%;
height: 2rem;
border-radius: 0.2rem;
display: flex;
flex-direction: column;
padding: 0 10px 0 0;
background-color: #f2f2f2;
margin-bottom: 2px;

.containerForInputAndIcon {
	align-items: center;
	display: flex;
	width: 100%;
	height: 100%;

}

	i {
		padding: 0 5px;
		color: grey;
	}
	:hover {
		border: 1px solid blue;
	}
	:focus-within {
		background-color: white;
	}
	input {
		padding: 3px 0;
		width: 100%;
		line-height: 1.5rem;
		background-color: #f2f2f2;
		
		:focus {
		background-color: white;
		}
	}

	 @media only screen and (max-width: 500px) {
  			min-width: 100%;
      }
`

const useQuery = () => {
	const [query, setQuery] = useState('')
	const [whatDidYouMean, setWhatDidYouMean] = useState([])

	const arrayOfWhatDidYouMean = () => {
		let arrayOfKeys = arrayOfKeywords.reduce((ack, item) => {
			if (item.includes(query)) {
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

const SearchInput = () => {
	const [query, setQuery, whatDidYouMean, setWhatDidYouMean] = useQuery()
	const searchForQuery = useSetArrayOfPhotos()

	const onChangeHandler = (e) => {
		setQuery(e.target.value)
		if (e.target.value.length > 1) {
		}
	}
	const enterHandler = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault()
			searchForQuery(query)
			setQuery('')
		}
	}

	return (
		<StyledInput>
			<div className='containerForInputAndIcon'>
				<i
					className="fas fa-search"
				></i>
				<input
					type='search'
					id='search'
					value={query}
					name='mainSearch'
					placeholder='write something, like "dog" or "forest"'
					onKeyDown={e => enterHandler(e)}
					onChange={(e) => onChangeHandler(e)}
					autoComplete="off"
				/>
			</div>
			<StyledCartWDM tabIndex='0'>
				{query.length > 2 && whatDidYouMean.map(item =>
					<CartOfWDM key={item} item={item} searchForQuery={searchForQuery} setQuery={setQuery} />)}
			</StyledCartWDM>
		</StyledInput>

	)
}

export default SearchInput
