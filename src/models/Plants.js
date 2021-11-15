function Plant(title, description, image, light){
    // var CATEGORIES = {
    //     "pot" : "Pot / Planter",
    //     "indoor" : "Indoor Plant",
    //     "outdoor" : "Outdoor Plant",
    //     "cacti" : "Cacti / Succulent"
    // };

        // var LIGHT = {
        //     "low" : 'Low or Artificial',
        //     "medium" : 'Low to Bright Indirect',
        //     "high" : 'Bright Indirect to Direct'
        // };

        this.title = title;
        this.description = description;
        this.image = image;
        this.light = light;


}

class IndoorPlant extends Plant{
    petFriendly;
    difficulty;
    soil;
    size;

    constructor(title, description,
                image, category, light, soil,
                difficulty, petFriendly, size){
        super(title, description, image, light, category);

        // var SOIL = {"potted" : 'Potting Soil', "cacti" : 'Cacti / Succulent Soil'};
        // var DIFFICULTY = {
        //     "minimal" : {
        //         short : "No-fuss",
        //         long: 'No-fuss - Carefree'
        //     },
        //     "easy" : {
        //         short: "Easy",
        //         long: "Easy - Relatively low Maintenance"
        //     },
        //     "moderate" : {
        //         short : "Moderate",
        //         long: "Moderate - Needs a bit of extra care"
        //     }
        // };
        // var SIZE = {
        //     "xs" : {
        //         short: "Xtra Small",
        //         long : 'Xtra Small - 5"-12" tall'
        //     },
        //     "sm" : {
        //         short : "Small",
        //         long : 'Small - 14"-16" tall',
        //     },
        //     "md" : {
        //         short: "Medium",
        //         long : 'Medium - 16"-24" tall'
        //     },
        //     "lg" : {
        //         short : "Large",
        //         long: 'Large - 32"40" tall'
        //     },
        //     "xl" : {
        //         short: "Xtra Large",
        //         long: 'Xtra Large - 44"-58" tall'
        //     }
        // };

        this.soil = soil;
        this.difficulty = difficulty;
        this.petFriendly = petFriendly;
        this.size = size;
    }
}

class OutdoorPlant extends Plant{
    height;
    spread;

    constructor(title, description, image){
        super(title, description, image);


    }
}


export {Plant, IndoorPlant, OutdoorPlant}
