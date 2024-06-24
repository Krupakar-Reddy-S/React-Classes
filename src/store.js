import { createStore } from "redux";
import { omit } from "lodash";

function cartReducer(state = { items : {} }, action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const product = action.payload;
            // when item is not in cart -> add item to cart else increase quantity
            if (state.items[product.id]) {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [product.id]: {
                            ...product,
                            quantity: state.items[product.id].quantity + 1
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [product.id]: {
                            ...product,
                            quantity: 1
                        }
                    }
                }
            }
        }

        case "REMOVE_FROM_CART": {
            if (state.items[action.payload.id].quantity <= 1) {
                return {
                    ...state,
                    items: omit(state.items, action.payload.id)
                }
            } else {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.payload.id]: {
                            ...state.items[action.payload.id],
                            quantity: state.items[action.payload.id].quantity - 1
                        }
                    }
                }
            }
        }

        default: {
            return state;
        }
    }
};

const store = createStore(cartReducer);

export default store;

// action is an object with type and payload
// state = {items: {1:{id: 1, quantity: 11}, 2:{id: 2, quantity: 10}, 3:{id: 3, quantity: 10}, 4:{id: 4, quantity: 10}}}

// ...state.items, ...product[1]
