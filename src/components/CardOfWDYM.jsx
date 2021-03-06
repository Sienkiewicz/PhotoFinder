import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'


const StyledCart = styled.div`
background-color: #fff0b3;
width: 99%;
margin: 0 auto;
line-height: 1.7rem;
z-index: 1;

:hover, :focus{
	background-color: #d9d9d9;
}
p {
	font-size: 1rem;
	padding-left: 10px;
}

`
// Card of 'What Did You Mean'
const CardOfWDYM = ({ item, searchForQuery, setQuery}) => {

	let history = useHistory()
	return (
		<StyledCart
		tabIndex='-1'
			onClick={() =>{ 
				if (item !== `Sorry, but I don't  found any keys`) {
				searchForQuery(item)
				} else { history.push(`/`)}
				setQuery('')
				}}
		>
			<p>{item}</p>
		</StyledCart>
	)
}

export default CardOfWDYM
