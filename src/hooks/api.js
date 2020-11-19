import { useState } from "react";
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: 'NcuYv7ozP0wKgXcjqXDIaMkgAcE2E6Mh4GpPOArE4KU' });

const w = window.outerWidth;
const h = window.outerHeight;

// const dimension = () =>  w > 1000 ? 'full' : w > 400 ? 'regular' : 'small'
const orientation = () => w > h ? 'landscape' : w < h ? 'portrait' : 'squarish'



export const useRandomizeApi = () => {
	const [randomPhoto, setRandomPhoto] = useState('')



	const randomizePhoto = async () => {
		try {
			unsplash.photos.getRandomPhoto({ orientation: `${ orientation() }` })
				.then(toJson)
				.then(json => {
					setRandomPhoto(json.urls.regular)
				});
		} catch (error) {
			console.log(error)
		}
	}

	return [randomPhoto, randomizePhoto]
}

export const useGetPhotoApi = () => {
	const [dataOfPhoto, setDataOfPhoto] = useState({})


	const getPhoto = async (id) => {
		try {
			unsplash.photos.getPhoto(id)
				.then(toJson)
				.then((json) => {
					let data = {
						location: json.location.name !== null ? json.location.name : '',
						userName: json.user.name ? json.user.name : '',
						urlOfPhoto: json.urls.regular
					}
					setDataOfPhoto(data)
				});
		} catch (error) {
			console.log(error)
		}

	}

	return [getPhoto, dataOfPhoto, setDataOfPhoto]
}
