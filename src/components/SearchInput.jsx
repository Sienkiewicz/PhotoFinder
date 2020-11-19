import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSetArrayOfPhotos } from '../Context'
import CartOfWDM from './CartOfWDM'
import useQuery from '../hooks/useQuery'

const StyledCartWDM = styled.div`
	margin-top:3px;
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



const SearchInput = () => {
	const [query, setQuery, whatDidYouMean, setWhatDidYouMean] = useQuery()
	const searchForQuery = useSetArrayOfPhotos()
	const inputRef = useRef()

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

	const getFocus = () => {
		inputRef.current.focus();
	}

	return (
		<StyledInput>
			<form className='containerForInputAndIcon'>
				<button
					title='search'
					onClick={getFocus}
				>
					<i
						className="fas fa-search"
					></i>
				</button>
				<input
					tabIndex='0'
					ref={inputRef}
					type='search'
					id='search'
					value={query}
					name='mainSearch'
					placeholder='write something...'
					onKeyDown={e => enterHandler(e)}
					onChange={(e) => onChangeHandler(e)}
					autoComplete="off"
				/>
			</form>
			<StyledCartWDM tabIndex='0'>
				{query.length > 2 && whatDidYouMean.map(item =>
					<CartOfWDM key={item} item={item} searchForQuery={searchForQuery} setQuery={setQuery} />)}
			</StyledCartWDM>
		</StyledInput>

	)
}

export default SearchInput
