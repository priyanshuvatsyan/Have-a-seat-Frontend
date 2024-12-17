/**
 * ContextReducer is is default hook in react
 * Use:an API given to us by React, allowing for the passing of information to child components without the use of props.
 *  reducer - a pure function, accepting a state & action, and returning a new state.
 * 
 * is code me ham use kr rhe h add to card vaqla feature ab jab ham kisi bhi product ko add to cart 
 * krte h to uska data vart me bhejne k liye hamne use element ka ek state bnana pdega to lets say ham,are paas 1000 products
 * ha to hame un sabke liye alag alag state bnane pdegi isko solve krne k vaste we use context reducer
 */
import React from 'react';


import {  useContext } from "react";
import { createContext, useReducer } from "react"

const CartStateContext = createContext();
const CartDispatchContext =  createContext();

const reducer = (state,action)=>{
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            { let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr; }
        case "DROP":
            { let empArray = []
            return empArray }
        case "UPDATE":
            { let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr }
        default:
            console.log("Error in Reducer");
    }
}

// eslint-disable-next-line react/prop-types
export const CardProvider = ({children})=>{

    const[state,dispatch] = useReducer(reducer,[]); /**Dispatch is the command or action that tells the reducer what to do 
    dispatch k andar sara change krne vala code jata h to vo aage puri application me change reflect hota ha*/

    return(
        <CartDispatchContext.Provider value = {dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = ()=> useContext(CartStateContext);
export const useDispatchCart = ()=> useContext(CartDispatchContext);