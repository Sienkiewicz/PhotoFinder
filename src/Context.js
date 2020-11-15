import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: 'NcuYv7ozP0wKgXcjqXDIaMkgAcE2E6Mh4GpPOArE4KU' });

const StateOfPhotosContext = React.createContext()
const SetStateOfPhotosContext = React.createContext()
const ClearStateOfPhotosContext = React.createContext()

const useArrayOfPhotos = () => {
	return useContext(StateOfPhotosContext)
}
const useSetArrayOfPhotos = () => {
	return useContext(SetStateOfPhotosContext)
}
const useClearArrayOfPhotos = () => {
	return useContext(ClearStateOfPhotosContext)
}

const StateProvider = ({ children }) => {
	let history = useHistory()
	const [arrayOfPhotos, setArrayOfPhotos] = useState([])

	const searchForQuery = async (query, nrOfPage = 1, perPage = 30) => {
		try {
			unsplash.search
				.photos(query, nrOfPage, perPage)
				.then(toJson)
				.then((json) => {
					let data = json.results
					if (nrOfPage === 1) {
						setArrayOfPhotos(data)
					} else if(nrOfPage <= json.total_pages){
						setArrayOfPhotos(prev => ([...prev, ...data]))
					}
				})
				.then(() => {
					history.push(`/s/photos/${ query }`)
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

export { StateProvider, useArrayOfPhotos, useSetArrayOfPhotos, useClearArrayOfPhotos }