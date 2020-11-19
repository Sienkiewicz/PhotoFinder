import React from 'react'
import styled from 'styled-components'


const StyledBackdropPhoto = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0,0,0,0.6);
display: flex;
justify-content: center;
align-items: center;

	.backdrop {
		background: white;
		width: 90%;
		/* height: 90%; */
		display: flex;
		flex-direction: column;
		
		i {
			cursor: pointer;
		}
		
		p {
			font-size: 0.8rem;
			@media only screen and (max-width: 500px) {
				font-size: 0.6rem;
      	}
		}
		
		div{
			padding: 20px;
			@media only screen and (max-width: 500px) {
				padding: 10px;
      	}
		}
		
		div:first-child {
			display: flex;
			justify-content: space-between;
		}
		div:last-child {
			text-align: right;
			padding-bottom: 20px;
		}
		.containerForImg {
			position: relative;
			margin: 0 auto;
			width: 100%;
			height: 80vh;
			display: flex;
			justify-content: center;
			@media only screen and (max-width: 500px) {
				height: 350px;
      	}

			.img {
				position: absolute;
				padding: 10px;
				max-height: 100%;
				max-width: 100%;
			}
		}
}
		
`


const BigPhoto = ({ location, userName, urlOfPhoto, setDataOfPhoto }) => {
	return (
		<StyledBackdropPhoto
		type='button'
		onClick={()=>setDataOfPhoto({})}
		>
				<div className='backdrop'>
					<div>
						<p>user Name: <b>{userName}</b></p>
						<i
							className="fas fa-times"
							onClick={() => setDataOfPhoto({})}
						></i>
					</div>
					<div className='containerForImg'>
						<img className='img' src={urlOfPhoto} alt=""></img>
					</div>
					<div><p>{location && 'location: '}{location}</p></div>
				</div>
		</StyledBackdropPhoto>
	)
}

export default BigPhoto
