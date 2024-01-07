import { useContext } from 'react'

import { CartContext } from '../../../contexts/cart.context'

import CheckoutItem from '../../../components/checkout-item/checkout-item.component'

import{CheckoutContainer,CheckoutHeader,HeaderBlock,Total,HeadText} from './checkout.styles.jsx'

const Checkout = ()=>{
    const { cartItems, cartTotal } = useContext(CartContext)

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <HeadText as='span'>Product</HeadText>
                </HeaderBlock>
                <HeaderBlock>
                    <HeadText as='span'>Description</HeadText>
                </HeaderBlock>
                <HeaderBlock>
                    <HeadText as='span'>Quantity</HeadText>
                </HeaderBlock>
                <HeaderBlock>
                    <HeadText as='span'>Price</HeadText>
                </HeaderBlock>
                <HeaderBlock>
                    <HeadText as='span'>Remove</HeadText>
                </HeaderBlock>
            </CheckoutHeader>
                {
                    cartItems.map((cartItem)=>{
                        return (
                            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                        )})
                }
            <Total as='span'>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout