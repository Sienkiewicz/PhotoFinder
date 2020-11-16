import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'


const StyledCart = styled.div`
background-color: #fff0b3;
width: 99%;
margin: 0 auto;
line-height: 2rem;
margin-bottom: 1px;
z-index: 1;

:hover {
	background-color: #d9d9d9;
}

`

const CartOfWDM = ({ tabIndex, item, searchForQuery, setQuery}) => {

	let history = useHistory()
	return (
		<StyledCart
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

export default CartOfWDM
