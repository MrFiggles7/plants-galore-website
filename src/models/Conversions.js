const Conversion = function () {
    this.SOIL = {"potted": 'Potting Soil', "cacti": 'Cacti / Succulent Soil'};
    this.DIFFICULTY = {
        "minimal": {
            short: "No-fuss",
            long: 'No-fuss - Carefree'
        },
        "easy": {
            short: "Easy",
            long: "Easy - Relatively low Maintenance"
        },
        "moderate": {
            short: "Moderate",
            long: "Moderate - Needs a bit of extra care"
        }
    };
    this.SIZE = {
        "xs": {
            short: "Xtra Small",
            long: 'Xtra Small - 5" - 12" tall'
        },
        "sm": {
            short: "Small",
            long: 'Small - 14" - 16" tall',
        },
        "md": {
            short: "Medium",
            long: 'Medium - 16" - 24" tall'
        },
        "lg": {
            short: "Large",
            long: 'Large - 32" - 40" tall'
        },
        "xl": {
            short: "Xtra Large",
            long: 'Xtra Large - 44" - 58" tall'
        }
    };

    this.CATEGORIES = {
        "pot": "Pot / Planter",
        "indoor": "Indoor Plant",
        "outdoor": "Outdoor Plant",
        "cactiSucculent": "Cacti / Succulent"
    };

    this.LIGHT = {
        "low": 'Low Light',
        "medium": 'Low to Indirect',
        "high": 'Bright Indirect'
    };

    this.DRAINAGE = {true: 'Yes', false: 'No'};

    this.PETFRIENDLY = {true: 'Yes', false: 'No'};

    this.convert = function (item) {
        if(item === "low" || item === "medium" || item === "high"){
            return this.LIGHT[item]
        }
        else if(item === 'potted' || item === 'cacti'){
            return this.SOIL[item]
        }
        else if(item === 'minimal' || item === 'easy' || item === 'moderate'){
            return this.DIFFICULTY[item]
        }
        else if(item === 'xs' || item === 'sm' || item === 'md' || item === 'lg' || item === 'xl'){
            return this.SIZE[item]
        }
        else if(item === 'pot' || item === 'indoor' || item === 'outdoor' || item === 'cactiSucculent'){
            return this.CATEGORIES[item]
        }
        else if(item === 'true' || item === 'false'){
            return this.DRAINAGE[item]
        }
        else if(item === 'true' || item === 'false'){
            return this.PETFRIENDLY[item]
        }

        return item;
    }

    return this

}

export default Conversion;

