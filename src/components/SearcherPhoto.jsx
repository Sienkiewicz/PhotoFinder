import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRandomizeApi } from '../hooks/api'
import SearchInput from './SearchInput'

const StyledSearcher = styled.div`
background: url(${ props => props.photoUrl }) no-repeat center center fixed;
background-size: cover;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

.container {
	width: 60%;
}
`

const SearcherPhoto = () => {
	const [randomPhoto, randomizePhoto] = useRandomizeApi()

	

	useEffect(() => {
		randomizePhoto()
	}, [])

	return (
		<StyledSearcher photoUrl={randomPhoto}>
			<div className='container'>
				<SearchInput />
			</div>
		</StyledSearcher>
	)
}

export default SearcherPhoto
