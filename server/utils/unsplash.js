import Unsplash from 'unsplash-js';
import _ from 'underscore';

const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_API_KEY });


export const getRandomImages = async () => {
  let images = [];
  try {
    // Unsplash has limit of 30 count and we would like to generate up to 90 images
    const responses = await Promise.all([unsplash.photos.getRandomPhoto({ count: 30 }), unsplash.photos.getRandomPhoto({ count: 30 }), unsplash.photos.getRandomPhoto({ count: 30 })]);
    if (responses[0].status == 200) {
      const results = await Promise.all(_.map(responses, (response) => response.json()));
      images = _.map(Array.prototype.concat(...results), (image) => image.urls.regular);
    }

  } catch (error) {
    //silence
    console.log(error)
  }
  return images
}

/*
  @description: the maximum is exclusive and the minimum is inclusive
*/
export const generateRandomNumber = (min = 0, max = 100) => {
  //The maximum is exclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default unsplash;
