import React, { useEffect } from 'react'
import Card from './Card'
import SearchInput from './SearchInput'
import { useArrayOfPhotos, useSetArrayOfPhotos } from '../Context'
import styled from 'styled-components'
import { useGetPhotoApi } from '../hooks/api'
import BigPhoto from './BigPhoto'
import { useRouteMatch } from 'react-router-dom'

const StyledPhotosSearchPage = styled.div`
width: 1100px;
padding: 15px;
margin: 0 auto;

	 @media only screen and (max-width: 500px) {
			  padding: 5px;
				width: 100%;
		}

.containerForSearchInput {
	width: 80%;
	display: flex;
	align-items: center;
		 @media only screen and (max-width: 500px) {
			  width: 100%;
		}

		div {
			padding-left: 10px;
			font-size: 1.3rem;
		}
}

.grid-container{
	width: 100%;
column-count: 3;

	@media only screen and (max-width: 800px) {
  			column-count: 2;
      }
	 @media only screen and (max-width: 500px) {
  			column-count: 1;
      }

}
`

const Photos = () => {
	const arrayOfPhotos = useArrayOfPhotos()
	const [getPhoto, dataOfPhoto, setDataOfPhoto, isFetching] = useGetPhotoApi()
	const match = useRouteMatch()
	const query = match.params.query

	const searchForQuery = useSetArrayOfPhotos()


	useEffect(() => {
		if(arrayOfPhotos.length === 0 && query) {
			searchForQuery(query)
		}
	}, [query])


	return (
		<StyledPhotosSearchPage>
			<div className='containerForSearchInput'>
				<SearchInput />
			</div>
			<div className='grid-container'>{arrayOfPhotos.map(item => {
				return <Card
					key={item.id}
					urlPhoto={item.urls.small}
					id={item.id}
					getPhoto={getPhoto} />
			})}</div>
			{dataOfPhoto.userName && !isFetching &&
				<BigPhoto location={dataOfPhoto.location}
					userName={dataOfPhoto.userName}
					urlOfPhoto={dataOfPhoto.urlOfPhoto}
					setDataOfPhoto={setDataOfPhoto} />}
		</StyledPhotosSearchPage>
	)
}

export default Photos
