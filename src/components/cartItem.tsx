import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCart"

import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrncy"

type cartItemprops = {
 id: number,
 quantity: number
}

export function CartItem({id, quantity} : cartItemprops) {
 const {removeItem} = useShoppingCart()
const item = storeItems.find(item => item.id === id)

if (item === null) return null
return (
 <Stack direction="horizontal" className="d-flex align-items-center" gap={2}>

  <img src={item?.imgUrl} style={{width: "125px", height: "75px", objectFit: "cover"}} />
  <div className="me-auto">
   <div>
    {item?.name} {quantity > 1 && <span style={{fontSize: ".65rem"}} className="text-muted">x{quantity}
    </span> }
   </div>
   <div className="text-muted" style={{fontSize: ".75rem" }}>{formatCurrency(item?.price || 0)} </div>
  </div>
  <div>{formatCurrency((item?.price || 0) * quantity)}</div>
  <Button variant="outline-danger" size="sm" onClick={() => removeItem(id)}>&times;</Button>
 </Stack>
)


}