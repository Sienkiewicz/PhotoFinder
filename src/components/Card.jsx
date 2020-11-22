import React, { forwardRef } from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
width: 100%;
display: inline-block;
border: 1px solid #d9d9d9;
margin-top: 14px;
position: relative;
cursor: zoom-in;
 padding-bottom: calc(${props => props.height } / ${ props => props.width} * 100%);
    height: 0;
    overflow: hidden;

	 @media only screen and (max-width: 500px) {
			  margin-top: 5px;
		}

:hover .overlay{
opacity:1;
}
.overlay {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  transition: .5s ease;
  opacity:0;
}
	img {
		   position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	}
`

const Card = forwardRef(({ width, height, urlPhoto, id, getPhoto }, ref) => {

	return (
		<StyledCard width={width} height={height} >
			<img
				ref={ref}
				src={urlPhoto}
				alt=""
			></img>
			<div
				onClick={() => getPhoto(id)}
				className='overlay'></div>
		</StyledCard>
	)
})
export default Card
