import {BaseItem} from './BaseItem.interface';

// Extended interface that considers an id to the Orders
export interface Item extends BaseItem{
    id: Number
}