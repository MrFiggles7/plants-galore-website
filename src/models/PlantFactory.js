import {IndoorPlant, OutdoorPlant} from "./Plants";
import Pot from "./Pots";
import Product from "./Product";

function PlantFactory(){

    this.create = function(item){

        if(item.category === 'indoor' || item.category === 'cactiSucculent'){
            return new IndoorPlant(
                item.title || null,
                item.description || null,
                item.image || null,
                item.light || null,
                item.soil || null,
                item.difficulty || null,
                item.petFriendly || false,
                item.size || null
            );
        }
        else if(item.category === 'outdoor'){
            return new OutdoorPlant(
                item.title || null,

                item.description || null,
                item.image || null
            )
        }
        else if(item.category ==='pot'){
            return new Pot(
                item.title || null,
                item.description || null,
                item.image || null,
                item.drainage || false,
                item.size || null
            )
        }
        else{
            return new Product(
                item,
                item.price,
                item.category
            )
        }
    }
}

export default PlantFactory;
