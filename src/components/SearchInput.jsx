import React, { useState } from 'react'
import styled from 'styled-components'
import { useSetArrayOfPhotos } from '../Context'

const StyledInput = styled.div`
border: 1px solid grey;
width: 100%;
height: 2rem;
border-radius: 0.2rem;
display: flex;
align-items: center;
padding: 0 10px 0 0;
background-color: #f2f2f2;
/* margin: 10px; */

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
		width: 100%;
		background-color: #f2f2f2;
		/* height: 100%; */
		
		:focus {
		background-color: white;
		}
	}

	 @media only screen and (max-width: 500px) {
  			min-width: 100%;
      }
`

const SearchInput = () => {
	const [query, setQuery] = useState('')
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

	// возвращает массив, состоящий из двух первых пользователей
	// let someUsers = users.filter(item => item.id < 3);

	// alert(someUsers.length); // 2

	return (
		<StyledInput>
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
			/>
			{console.log('dkfj')}
		</StyledInput>
	)
}

export default SearchInput
