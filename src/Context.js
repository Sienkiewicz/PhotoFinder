import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: 'NcuYv7ozP0wKgXcjqXDIaMkgAcE2E6Mh4GpPOArE4KU' });

const StateOfPhotosContext = React.createContext()
const SetStateOfPhotosContext = React.createContext()
const ClearStateOfPhotosContext = React.createContext()

const useArrayOfPhotosContext = () => {
	return useContext(StateOfPhotosContext)
}
const useSetArrayOfPhotosContext = () => {
	return useContext(SetStateOfPhotosContext)
}
const useClearArrayOfPhotosContext = () => {
	return useContext(ClearStateOfPhotosContext)
}

const StateProviderContext = ({ children }) => {
	let history = useHistory()
	const [arrayOfPhotos, setArrayOfPhotos] = useState([])

	const searchForQuery = async (query, pageNr = 1, perPage = 10) => {
		try {
			unsplash.search
				.photos(query, pageNr, perPage)
				.then(toJson)
				.then((json) => {
					let data = json.results
					if (pageNr === 1) {
						setArrayOfPhotos(data)
					} else if (pageNr <= json.total_pages){
						setArrayOfPhotos(prev => ([...prev, ...data]))
					} else {console.log('end of gallery')}
				})
				.then(() => {
					history.push(`/photos/${ query }`)
				})
		} catch (error) {
			console.log(error)
		}

	}

	const clearArrayOfPhotos = () => {
		setArrayOfPhotos({})
	}

	return (
		<StateOfPhotosContext.Provider value={arrayOfPhotos}>
			<SetStateOfPhotosContext.Provider value={searchForQuery}>
				<ClearStateOfPhotosContext.Provider value={clearArrayOfPhotos}>
					{children}
				</ClearStateOfPhotosContext.Provider>
			</SetStateOfPhotosContext.Provider>
		</StateOfPhotosContext.Provider>
	)
}

export { StateProviderContext, useArrayOfPhotosContext, useSetArrayOfPhotosContext, useClearArrayOfPhotosContext }