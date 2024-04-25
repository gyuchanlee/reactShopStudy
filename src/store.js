import {configureStore, createSlice} from '@reduxjs/toolkit';
import user from './store/userSlice.js';

// Redux 쓸 때 쓰는 보관함 같은 거 -> store

// useState 의 역할
// state 하나를 slice 라고 부름


let stock = createSlice({
    name : 'stock',
    initialState: [10,11,12,13,14]
});

let cartInfo = createSlice({
    name : 'cartInfo',
    initialState: [
        {id: 0, name: '감사콩', count: 2},
        {id: 2, name: '망곰', count: 1}
    ],
    reducers : {
        setCount : (state, action) => {
            let findCart = state.find(cart =>cart.id === action.payload);
            findCart.count++;
        },
        addCart : (state, action) => {
            let newItem = {
                id: action.payload.id,
                name: action.payload.title,
                count: 1
            };

            // 조건에 맞는 요소를 array에서 원몇번째에 있나 찾아주는 함수 / 이런 것도 있음. > 찾은 번호로 뭐 array[cart2]해서 값 찾던가.
            // let cart2 = state.findIndex((a) => {return a.id === action.payload.id});

            let find = state.find(cart => cart.id === action.payload.id);
            if (find !== null && find !== undefined) {
                alert("중복상품은 담을 수 없습니다")
                return;
            }
            state.push(newItem);
        }
    }
})

// {} 사이에 export할 함수들 나열하기
export let { setCount, addCart } = cartInfo.actions


export default configureStore({
    reducer : {
        // state 하나 등록
        user : user.reducer,
        stock : stock.reducer,
        cartInfo : cartInfo.reducer
    }
})