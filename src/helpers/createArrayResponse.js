/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const moment = require('moment');

const createArrResponse = (arr = []) => {
  const newArr = [];
  arr.forEach((e) => {
    const alreadyExist = newArr.findIndex((el) => el.id === e.id_game);
    if (alreadyExist < 0) {
      const { id_game, title, poster, short_description, description, release_date } = e;
      newArr.push({
        id: id_game,
        title,
        poster,
        short_description,
        description,
        release_date: moment(release_date).format('DD/MM/YYYY'),
        genre: [e.genre],
        platform: [e.platform],
        developer: [e.developer],
        publisher: [e.publisher],
      });
    } else {
      newArr[alreadyExist] = {
        ...newArr[alreadyExist],
        genre: [...newArr[alreadyExist].genre, e.genre],
        platform: [...newArr[alreadyExist].platform, e.platform],
        developer: [...newArr[alreadyExist].developer, e.developer],
        publisher: [...newArr[alreadyExist].publisher, e.publisher],
      };
    }
  });

  const arrResponse = newArr.map((obj) => {
    const genre = new Set(obj.genre);
    const platform = new Set(obj.platform);
    const developer = new Set(obj.developer);
    const publisher = new Set(obj.publisher);
    const newObj = {
      ...obj,
      genre: [...genre].sort(),
      platform: [...platform].sort(),
      developer: [...developer].sort(),
      publisher: [...publisher].sort(),
    };
    return newObj;
  });
  return arrResponse;
};

module.exports = createArrResponse;
