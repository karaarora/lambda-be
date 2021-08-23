const Meme = require('../models/memes');
const objUtils = require('../utils/objUtils');

module.exports = {
  getAllMemes: async (filters) => {
    if (objUtils.isEmpty(filters)) return Meme.find();
    const newFilters = {};
    if (filters.query) {
      newFilters.heading = { $regex: filters.query, $options: 'i' };
    }
    return Meme.find(newFilters);
  },
  saveMeme: async () => {
    // For test adding memes only. Delete later
    const meme = new Meme({
      heading: 'My good meme',
      user_id: '1',
      thumbnail_url: 'https://tse3.mm.bing.net/th/id/OIP.GlVyfVKp1NKwaSo0lWgwUAHaHa?w=176&h=180&c=7&o=5&dpr=2&pid=1.7',
      image_url: 'https://tse3.mm.bing.net/th/id/OIP.GlVyfVKp1NKwaSo0lWgwUAHaHa?w=176&h=180&c=7&o=5&dpr=2&pid=1.7',
    });
    meme.save();
  },
};
