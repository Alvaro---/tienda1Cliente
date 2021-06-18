import React, { useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    //  console.log(state)
   // const [isLogged, setIsLogged] = state.userApi.isLogged
   // const [isAdmin, setIsAdmin] = state.userApi.isAdmin
    const [isLogged] = state.userApi.isLogged
    const [isAdmin] = state.userApi.isAdmin
    const [cart] = state.userApi.cart

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Crear Productos</Link></li>
                <li><Link to="/category">Categorias</Link></li>
            </>
        )
    }

    const logoutUser = async () => {
        await axios.get('user/logout')
        localStorage.clear()
        // setIsAdmin(false)
        // setIsLogged(false)
        window.location.href = "/";
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">Historial</Link></li>
                <li><Link to="/" onClick={logoutUser}>LogOut</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Aministrar Tienda' : ' TIenda en Linea'}</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? 'Productos' : ' Tienda'}</Link></li>
                {isAdmin && adminRouter()}

                {isLogged ?
                    loggedRouter()
                    :
                    <li><Link to="/login">Login - Register</Link></li>
                }

                <li>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>
            {
                isAdmin ? ''
                    :
                    <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="30" />
                        </Link>
                    </div>
            }



        </header>
    )
}

export default Header
