import Unsplash from 'unsplash-js';
import _ from 'underscore';

const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_API_KEY });


export const getRandomImages = async () => {
  let images = [];
  try {
    // Unsplash has limit of 30 count and we would like to generate up to 90 images
    const responses = await Promise.all([unsplash.photos.getRandomPhoto({ count: 30, collections: ['431862'] }),
      unsplash.photos.getRandomPhoto({ count: 30, collections: ['632843'] }),
      unsplash.photos.getRandomPhoto({ count: 30, collections: ['1111678'] })]);

    if (responses[0].status === 200) {
      const results = await Promise.all(_.map(responses, response => response.json()));
      images = _.map(Array.prototype.concat(...results), image => image.urls.regular);
      console.log(images);
      
    }
  } catch (error) {
    // silence
    console.log(error);
  }
  return images;
};

/*
  @description: the maximum is exclusive and the minimum is inclusive
*/
export const generateRandomNumber = (minVal = 0, maxVal = 100) => {
  // The maximum is exclusive and the minimum is inclusive
  const min = Math.ceil(minVal);
  const max = Math.floor(maxVal);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default unsplash;
