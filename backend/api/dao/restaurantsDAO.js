let restaurants 

export default class RestaurantsDAO {
    static async injectDB(conn){
        if (restaurants) {
            return
        }
        try{
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
    
        } catch (e) {
            console.error(
                'unable to establish a collection handle in restaurantsDAO: ${e}',
            )
        }
    }


    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsperpage = 20,
    } = {} ) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: {$search: filters ["name"] } }
            } else if ("cruise" in filters) {
                query = {"cruisine" : { seq: filters["cruisine"] } }
            } else if ("zipcode" in filters) {
                query = {"adddress.zipcode": { $eq: filters["zipcode"] } }
            }
            
        }

        let cursor 

        try {
            cursor = await restaurants
            .find(query)
        }   catch (e) {
            console.error(
                'unable to issue find command , ${e}'
            )
        }

    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsperpage = 20,
    } = {} ) {
        let query 
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = {"cruisine" : { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode" : {$eq: filters["zipcode"] } }
            }
        }

        let cursor 

        try {
            cursor = await restaurants 
            .find(query)
        } catch (e) {
            console.error('unable to issue find command, $(e)')
            return { restaurantslist: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsperpage).skip(restaurantsperpage * page)
         

    }
}
