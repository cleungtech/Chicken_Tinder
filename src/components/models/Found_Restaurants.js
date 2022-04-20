import Restaurant_Card from "./src/components/models/Restaurant_Card.js"

class Found_Restuarants {
    constructor(api_data) {
        this.restaurant_data = api_data["businesses"];
        this.card_list = [];

        for (const restaurant of this.restaurant_data) {
            new_card = Restaurant_Card(restaurant);
            this.card_list.push(new_card);
        }
    }
}

export { Found_Restuarants }