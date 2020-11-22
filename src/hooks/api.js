import { useState } from "react";
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: 'NcuYv7ozP0wKgXcjqXDIaMkgAcE2E6Mh4GpPOArE4KU' });

const w = window.innerWidth;
const h = window.innerHeight;

const dimensionOfPic = (json) => {
	if (w > 1080) {
		return json.urls.full + `&fm=jpg&w=${ w }&q=70&fit=crop`
	} else if (w > 400) {
		return json.urls.regular
	} return json.urls.small
}


const orientation = () => w / h > 1.3 ? 'landscape' : w / h < 0.7 ? 'portrait' : 'squarish'



export const useRandomizeApi = () => {
	const [randomPhoto, setRandomPhoto] = useState('')


	const randomizePhoto = async () => {
		try {
			unsplash.photos.getRandomPhoto({ orientation: `${ orientation() }` })
				.then(toJson)
				.then(json => {
					setRandomPhoto(dimensionOfPic(json))
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
						urlOfPhoto: dimensionOfPic(json)
					}
					setDataOfPhoto(data)
				});
		} catch (error) {
			console.log(error)
		}

	}

	return [getPhoto, dataOfPhoto, setDataOfPhoto]
}
