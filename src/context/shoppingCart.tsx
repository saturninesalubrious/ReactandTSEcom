import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";


type ShoppingCartProviderprops = {
 children: ReactNode
}

type ShoppingCartContext = {
 openCart: () => void,
 closeCart: () => void,
 cartQuantity: number,
 cartItems: cartItem[]
 getItemQuantity: (id: number) => number,
 increaseCartQuantity: (id: number) => void,
 decreaseCardQuantity: (id: number) => void,
 removeItem: (id: number) => void
}

type cartItem = {
 id: number,
 quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
 return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}: ShoppingCartProviderprops){
 const [isOpen, setIsOpen] = useState(false)

 const [cartItems,setCartItems] = useState<cartItem[]>([])

 const openCart = () => {setIsOpen(true)}
 
 const closeCart = () => {setIsOpen(false)}

 function getItemQuantity(id: number){
  return cartItems.find(item => item.id === id)?.quantity || 0
 }

 function increaseCartQuantity(id: number) {
  setCartItems(currItems => {
    if (currItems.find(item => item.id === id) == null) {
      return [...currItems, { id, quantity: 1 }]
    } else {
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    }
  })
}

function decreaseCardQuantity(id: number) {
 setCartItems(currItems => {
   if (currItems.find(item => item.id === id)?.quantity === 1) {
     return currItems.filter(item => item.id !== id)
   } else {
     return currItems.map(item => {
       if (item.id === id) {
         return { ...item, quantity: item.quantity - 1 }
       } else {
         return item
       }
     })
   }
 })
}
function removeItem(id: number) {
 setCartItems(currItems => {
   return currItems.filter(item => item.id !== id)
 })
}

const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

 return (<ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCardQuantity, removeItem,cartQuantity, cartItems, openCart, closeCart}}>
  {children}
  <ShoppingCart isOpen={isOpen} />
 </ShoppingCartContext.Provider>)



}