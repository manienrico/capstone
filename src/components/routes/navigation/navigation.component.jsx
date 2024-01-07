import { Fragment, useContext, useState } from "react"
import { Outlet, Link } from "react-router-dom"

import CartIcon from "../../cart-icon/cart-icon.component"
import CartDropdown from "../../cart-dropdown/cart-dropdown.component"

import { UserContext } from "../../../contexts/user.context"

import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'

import { signOutUser } from "../../../utils/firebase/firebase.utils"

import {NavigationContainer,LogoContainer,NavLinksContainer,NavLinks} from './navigation.styles.jsx'

import { signOut } from "firebase/auth"
import { CartContext } from "../../../contexts/cart.context"

const Navigation=()=>{
  const { currentUser,  } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="logo" />
            </LogoContainer>
          
          <NavLinksContainer>
            <NavLinks to="/shop">
                SHOP
            </NavLinks>
            {
              currentUser ? (<NavLinks as='span' onClick={signOutUser}>SIGN OUT</NavLinks>
              ): (<NavLinks to="/auth">
                SIGN IN
            </NavLinks>)
            }
            <CartIcon />
          </NavLinksContainer>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation  