import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState: {name:'LeeGyuChan', age: 28},
    reducers : {
        setUser : (state, action) => {
            // state -> 기존 state
            state.name = action.payload;
        },
        plusAge : (state, action) => {
            // state.age++;
            state.age += action.payload;
        }
    }
});

export let { setUser, plusAge } = user.actions

export default user;