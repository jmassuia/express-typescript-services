
/* Data models */
import { BaseItem } from "./BaseItem.interface";
import { Item } from "./Item.interface";
import { Items } from "./Items.interface";

/* In-memory Data */
let items: Items={
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
      },
      2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
      },
      3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
      }
};


/* Service Methods */

/* Get all in stream orders */
export const findAll = async():Promise<Item[]> => Object.values(items);

/* Get one in stream order */
export const findOne = async(id:number):Promise<Item> => items[id];

/* Create new item based on BaseItem Interface and insert it to the in stream data */
export const create = async(newItem: BaseItem): Promise<Item> =>{
    const id = new Date().valueOf();

    items[id]={
        id,
        ...newItem,
    }

    return items[id];
}

/* Update items from in stream data */
export const update = async(id:number, itemUpdate: BaseItem): Promise<Item | null> =>{
    const item = await findOne(id);

    if(!item){
        return null;
    }
    
    items[id] = {id,...itemUpdate};

    return items[id];
}

/* Delete order from in stream data */
export const remove = async(id:number):Promise<null | void| String>=>{

    const item = await findOne(id);

    if(!item){
        return "There's no order with this id!";
    }

    delete items[id];

}