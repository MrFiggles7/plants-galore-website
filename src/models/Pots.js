class Pot{
    drainage;
    size;

    constructor(title, description, image, drainage, size){
        // var DRAINAGE = {true : 'Yes', false : 'None'};

        // var SIZE = {
        //     "xs" : {
        //         short: "Xtra Small",
        //         long : 'Xtra Small - 1"-3"'
        //     },
        //     "sm" : {
        //         short : "Small",
        //         long : 'Small - 3"-5"',
        //     },
        //     "md" : {
        //         short: "Medium",
        //         long : 'Medium - 5"-8"'
        //     },
        //     "lg" : {
        //         short : "Large",
        //         long: 'Large - 8"-12"'
        //     },
        //     "xl" : {
        //         short: "Xtra Large",
        //         long: 'Xtra Large - 12"-24"'
        //     }
        // };

        this.title = title;
        this.description = description;
        this.image = image;
        this.drainage = drainage;
        this.size = size;
    }
}

export default Pot;

