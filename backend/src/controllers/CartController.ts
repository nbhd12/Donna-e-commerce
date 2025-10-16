import { Request, Response } from "express";
import { cartItem, cartState } from "../typesBackend/cart"; 

function ensureCart(req: any): cartState {
  if (!req.session.cart) {
    req.session.cart = { items: [], totalQuantity: 0, subTotal: 0 };
  }
  return req.session.cart;
}

function recompute(cart: cartState) {
  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subTotal = Number(
    cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
}

export async function getCart(req: Request, res: Response) {
  const cart = ensureCart(req);
  return res.json(cart);
}

export async function addToCart(req: Request, res: Response) {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "productId and quantity are required" });
  }

  const cart = ensureCart(req);
  const id = Number(productId);
  const amount = Math.max(1, Math.min(99, Number(quantity) || 1));

  // TODO: Later, fetch product from database
  const product = {
    id,
    name: "Example Product",
    description: "Product description",
    price: 100,
    photo: "https://placehold.co/300x300",
  };

  const existingItem = cart.items.find((item) => item.productId === id);

  if (existingItem) {
    existingItem.quantity += amount;
  } else {
    cart.items.push({
      productId: id,
      name: product.name,
      description: product.description,
      price: product.price,
      photo: product.photo,
      quantity: amount,
    });
  }

  recompute(cart);
  return res.json(cart);
}

export async function updateCartItem(req: Request, res: Response) {
  const productId = Number(req.params.id);
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const cart = ensureCart(req);
  const item = cart.items.find((i) => i.productId === productId);

  if (!item) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  item.quantity = quantity;
  recompute(cart);
  return res.json(cart);
}

export async function removeFromCart(req: Request, res: Response) {
  const productId = Number(req.params.id);
  const cart = ensureCart(req);

  cart.items = cart.items.filter((item) => item.productId !== productId);
  recompute(cart);
  return res.json(cart);
}