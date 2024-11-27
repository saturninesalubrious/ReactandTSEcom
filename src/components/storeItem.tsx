import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrncy"
import { useShoppingCart } from "../context/shoppingCart"
type StoreItemProps = {
 id: number,
 imgUrl: string,
 price: number,
 name: string
}

export function StoreItem({id, imgUrl, price, name }: StoreItemProps) {

 const {getItemQuantity, increaseCartQuantity, decreaseCardQuantity, removeItem} = useShoppingCart() 

 const quantity = getItemQuantity(id)

 return (<Card className="h-100">
  <Card.Img src={imgUrl} height="200px" variant="top" style={{objectFit: "cover" }}/>
  <Card.Body className="d-flex flex-column">
   <Card.Title className="d-flex justify-content-between align-tems-baseline mb-4">
   <span className="fs-2">{name}</span>
   <span className="ms-2 text-muted">{formatCurrency(price)}</span>
   </Card.Title>
  </Card.Body>
  <div className="mt-auto">
   {quantity === 0 ? (<Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to cart</Button>):(<div style={{gap: "0.5rem"}} className="d-flex align-items-center flex-column ">
    <div style={{gap: "0.5rem"}} className="d-flex align-items-center justify-content-center"> <Button onClick={() => decreaseCardQuantity(id)}>-</Button>
    <div><span className="fs-3">{getItemQuantity(id)}
     </span>in cart
    </div>
    <Button onClick={() => increaseCartQuantity(id)}>+</Button> </div>
    <Button onClick={() => removeItem(id)} variant="danger" size="sm">removeItem</Button>
   </div>)}
  </div>


 </Card>
  
 )
}