import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCart";
import { CartItem } from "./cartItem";
import { formatCurrency } from "../utilities/formatCurrncy";
import storeItems from "../data/items.json"


type shoppingCartprops = {
 isOpen: boolean
}

export function ShoppingCart({isOpen}: shoppingCartprops) {

 const {closeCart,cartItems } = useShoppingCart()

 return <Offcanvas show={isOpen} onShow={true} onHide={closeCart}>
  
  <Offcanvas.Header >
   <Offcanvas.Title>
    Cart
   </Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>
   <Stack gap={3}>
    {cartItems.map(item => 
     <CartItem key={item.id} {...item}/>
    )}
    <div className="ms-auto fw-bold fs-5">
     Total {formatCurrency(cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(i => i.id === cartItem.id)
      return total + (item?.price || 0 ) * cartItem.quantity
     }, 0 ))}
    </div>
   </Stack>
  </Offcanvas.Body>


 </Offcanvas>
}