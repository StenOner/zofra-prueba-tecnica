import { ShoppingCartItem } from './shopping-cart-item.dto'

export interface ProductHistory {
  id: number
  date: string
  items: ShoppingCartItem[]
}