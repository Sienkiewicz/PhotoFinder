import React, { useCallback, useEffect, useRef, useState } from 'react'
import Card from './Card'
import SearchInput from './SearchInput'
import { useArrayOfPhotosContext, useSetArrayOfPhotosContext } from '../Context'
import styled from 'styled-components'
import { useGetPhotoApi } from '../hooks/api'
import BigPhoto from './BigPhoto'
import { useRouteMatch } from 'react-router-dom'

const StyledPhotosSearchPage = styled.section`
width: 1100px;
padding: 15px;
margin: 0 auto;
max-width: 100%;

	 @media only screen and (max-width: 800px) {
			  padding: 5px;
				/* width: 100%; */
		}

.containerForSearchInput {
	position: fixed;
	z-index: 1;
	width: 50%;
	display: flex;
	align-items: center;
		 @media only screen and (max-width: 500px) {
			  width: 100%;
		}

}

.grid-container{
	padding-top: 2rem;
	column-count: 3;
	width: 100%;

	@media only screen and (max-width: 800px) {
  			column-count: 2;
		}
		
	 @media only screen and (max-width: 500px) {
  			column-count: 1;
      }

}
`

const Photos = () => {
	const arrayOfPhotos = useArrayOfPhotosContext()
	const [getPhoto, dataOfPhoto, setDataOfPhoto, isFetching] = useGetPhotoApi()
	const match = useRouteMatch()
	const query = match.params.query
	const [pageNr, setPageNr] = useState(1)

	const searchForQuery = useSetArrayOfPhotosContext()
	const observer = useRef()
	const lastCardElementRef = useCallback(node => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setPageNr(prev => prev + 1)
				console.log('visible')
			}
		})
		if (node) observer.current.observe(node)
	}, [])

	useEffect(() => {
		if (pageNr > 1) {
			console.log(pageNr)
			searchForQuery(query, pageNr)
		}
	}, [pageNr])

	useEffect(() => {
		setPageNr(1)
		if (arrayOfPhotos.length === 0 && query) {
			searchForQuery(query)
		}
	}, [query])



	return (
		<StyledPhotosSearchPage>
			<div className='containerForSearchInput'>
				<SearchInput />
			</div>
			<div className='grid-container'>{arrayOfPhotos.map((item, index) => {
				if (arrayOfPhotos.length === index + 1) {
					return <Card
						ref={lastCardElementRef}
						key={item.id}
						width={item.width}
						height={item.height}
						urlPhoto={item.urls.small}
						id={item.id}
						getPhoto={getPhoto} />
				} else {
					return <Card
						key={item.id}
						width={item.width}
						height={item.height}
						urlPhoto={item.urls.small}
						id={item.id}
						getPhoto={getPhoto} />
				}
			})}
			</div>
			{dataOfPhoto.userName && !isFetching &&
				<BigPhoto location={dataOfPhoto.location}
					userName={dataOfPhoto.userName}
					urlOfPhoto={dataOfPhoto.urlOfPhoto}
					setDataOfPhoto={setDataOfPhoto}
				/>}
		</StyledPhotosSearchPage>
	)
}

export default Photos
