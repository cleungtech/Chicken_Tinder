const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

const NUM_RESTAURANT = 10;
const RESTAURANT = 'restaurant';

const get_restaurants = async (longitude, latitude) => {

  const response = await client.search({
    term: "restaurants",
    latitude: latitude,
    longitude: longitude,
    limit: NUM_RESTAURANT
  })
  return response.jsonBody.businesses;;
}

module.exports = {
  get_restaurants,
  NUM_RESTAURANT
}