const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

const NUM_RESTAURANT = 10;
const RESTAURANT = 'restaurant';

const get_resterants = async (longitude, latitude) => {

  const response = await client.search({
    term: "restaurants",
    latitude: longitude,
    longitude: latitude,
    limit: NUM_RESTAURANT
  })
  return response.jsonBody.businesses;;
}

module.exports = {
  get_resterants,
  NUM_RESTAURANT
}