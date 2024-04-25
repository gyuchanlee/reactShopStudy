import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setUser, plusAge } from "../store/userSlice.js";
import { setCount } from "../store";

const Cart = () => {

    // Redux store 가져와줌 -> 저장한 state 전부 가져옴
    let store = useSelector((state) => {return state})
    let user = useSelector((state) => state.user)
    let stock = useSelector((state) => state.stock)
    let cartInfo = useSelector((state) => state.cartInfo)
    console.log(store)
    console.log(user)
    console.log(stock)

    // store.js로 요청을 보냄
    let dispatch = useDispatch();

    return (
        <div>
            <h4>{user.age}살 {user.name}의 장바구니</h4>
            <button onClick={() => {
                dispatch(plusAge(1))
            }}>나이 한살 추가</button>
            <Table>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {/*<tr>*/}
                {/*    <td>1</td>*/}
                {/*    <td>{store.user}</td>*/}
                {/*    <td>{stock[0]}</td>*/}
                {/*    <td>안녕</td>*/}
                {/*</tr>*/}

                {
                    cartInfo.map((cart) => {
                        return (
                            <tr key={cart.id}>
                                <td>{cart.id}</td>
                                <td>{cart.name}</td>
                                <td>{cart.count}</td>
                                <td>
                                    <button onClick={() => {
                                        // dispatch(setUser('John Doe'))
                                        // console.log(user)
                                        dispatch(setCount(cart.id))
                                    }}>버튼임</button>
                                </td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </Table>
        </div>
    )
}

export default Cart;