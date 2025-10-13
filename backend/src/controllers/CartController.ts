import  {Request, Response} from "express";
import  * as ProductRepo from "../repository/ProductRepository";
import type  {cartItem, cartState} from "../types/cart"
import { it } from "node:test";

 function ensureCart (req:Request): cartState {
   if (!req.session.cart) {
    req.session.cart =  {items: [], totalQuantity:0, subTotal :0}
   }
   return req.session.cart!;
 }


function recompute (cart: cartState) {
    cart.totalQuantity = cart.items.reduce ((start, items) => start + items.quantity, 0)
    cart.subTotal = Number(cart.items.reduce( (start, items) => start + items.price * items.quantity, 0).toFixed(2)) 
} 


export async function getCart (req: Request, res :Response) {
    const cart = ensureCart(req);
    return res.json(cart)
}


export async function addToCart (req: Request, res :Response) {
    const body = req.body || {};
    const productId = body.productId;
    const quantity = body.quantity;
    const id = Number(productId);
    const amount = Math.max(1, Math.min(99, Number(quantity) || 1));
}