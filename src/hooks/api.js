import { useState } from "react";
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: 'NcuYv7ozP0wKgXcjqXDIaMkgAcE2E6Mh4GpPOArE4KU' });

const w = window.innerWidth;
const h = window.innerHeight;

const orientation = () => w / h > 1.3 ? 'landscape' : w / h < 0.7 ? 'portrait' : 'squarish'


const dimensionOfPic = (json, offset) => {
	if(json.width > json.height) {
		if (w > 1080) {
			return json.urls.full + `&fm=jpg&w=${ w }&q=70&fit=crop`
		} else if (w > 400) {
			return json.urls.regular + `&fm=jpg&w=${ w }&q=70&fit=crop`
		} return json.urls.small
	} else {
		if (h > 1080) {
			return json.urls.full + `&fm=jpg&h=${ h }&q=70&fit=crop`
		} else if (h > 400) {
			return json.urls.regular + `&fm=jpg&h=${ h }&q=70&fit=crop`
		} return json.urls.small
	}
}

export const useRandomizeApi = () => {
	const [randomPhoto, setRandomPhoto] = useState('')

	const randomizePhoto = async () => {
		try {
			unsplash.photos.getRandomPhoto({ orientation: `${ orientation() }` })
				.then(toJson)
				.then(json => {
					setRandomPhoto(dimensionOfPic(json, 1))
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
						urlOfPhoto: dimensionOfPic(json, 2),
					}
					setDataOfPhoto(data)
				});
		} catch (error) {
			console.log(error)
		}

	}

	return [getPhoto, dataOfPhoto, setDataOfPhoto]
}
