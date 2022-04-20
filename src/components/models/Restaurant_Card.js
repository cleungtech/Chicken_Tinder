class Restaurant_Card {
    constructor(restaurant_data) {
        this.name = restaurant_data['name'];
        this.rating = restaurant_data['rating'];
        this.review_count = restaurant_data['review_count'];
        this.image_url = restaurant_data['image_url'];
    }
}

export { Restaurant_Card }