import { createContext, useReducer } from 'react'

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            //add to cart
            const newItem = action.payload;
            const exists = state.cart.cartItems.find((x) => x._id === newItem._id);
            const cartItems = exists ? state.cart.cartItems.map((x) => x._id === exists._id ? newItem : x) : [...state.cart.cartItems, newItem];

            return { ...state, cart: { ...state.cart, cartItems } };
            
        default:
            return state;
    }
}

function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children} </Store.Provider>
}

export default StoreProvider;
