import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
display: inline-block;
width: 100%;
border: 1px solid #d9d9d9;
margin-top: 14px;
position: relative;
cursor: zoom-in;

	 @media only screen and (max-width: 500px) {
			  margin-top: 5px;
		}

:hover .overlay{
opacity:1;
}
.overlay {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2); /* Black see-through */
  width: 100%;
  height: 100%;
  transition: .5s ease;
  opacity:0;
}
	img {
		width: 100%;
	}
`

const Card = ({ urlPhoto, id, getPhoto }) => {
	return (
		<StyledCard>
			<img
				src={urlPhoto}
				alt=""
			></img>
			<div
				onClick={() => getPhoto(id)}
				className='overlay'></div>
		</StyledCard>
	)
}

export default Card
