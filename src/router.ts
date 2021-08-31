import express,{Request,Response} from 'express';

import * as ItemService from "./Items/items.service";
import {Item} from './Items/Item.interface';

export const itemRouter = express.Router();

itemRouter.get('/',(async(req:Request, res:Response)=>{
    try{
        const items: Item[] = await ItemService.findAll();
        res.status(200).json({
            status:'Successful',
            data:items
        })
    }
    catch(err){
        res.status(503).json({
            status:'Error',
            message:err
        })
    }
}))

itemRouter.get('/:id',(async(req:Request, res:Response)=>{
    
    const id:number = parseInt(req.params.id,10);
    
    try{
        const item:Item = await ItemService.findOne(id);

        res.status(200).json({
            status:'Successful',
            data:item
        })
    }
    catch(err){
        res.status(503).json({
            status:'Unsuccessful',
            message:err
        })
    }
}))

itemRouter.post('/',(async(req:Request,res:Response)=>{
    
    const newItem = req.body;

    try{
        const item = await ItemService.create(newItem);

        res.status(200).json({
            status:'Successful',
            data:item
        })
    }
    catch(err){
        res.status(503).json({
            status:'Successful',
            message:err
        })
    }
}))

itemRouter.put('/:id',(async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id,10);
    const itemUpdate: Item = req.body;

    try{
        const item:Item = await ItemService.findOne(id);

        if(!item){
            res.status(503).json({
                message:'No item was found with this id!'
            })
        }

        const updatedItem = await ItemService.update(id,itemUpdate)

        res.json(201).json({
            status:'Successul',
            data:updatedItem
        })
    }
    catch(err){
        res.status(500).json({
            status:'Unsuccessful',
            message:err
        })
    }
}))

itemRouter.delete('/:id',(async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id,10)

    try{
        await ItemService.remove(id);
        res.status(200).json({
            status:"Successful",
            data:null
        })
    }
    catch(err){
        res.status(500).json({
            status:'Unsuccessful',
            message:err
        })
    }
}))