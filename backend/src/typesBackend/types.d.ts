// import "express-session";
import { cartState } from "../types/cart";

declare module "express-session" {
  interface SessionData {
    cart?: cartState;
  }
}