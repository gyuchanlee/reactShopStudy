import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setUser, plusAge } from "../store/userSlice.js";
import { setCount } from "../store";
import {memo, useMemo, useState} from "react";

const Child = memo( () => {
    console.log('재렌더링됨')
    const memo1 = useMemo(() => {
        console.log('실행할 함수');
    }, []);
    return <div>자식임</div>
})
// memo는 props가 변화하면 재렌더링함 -> 그전에 비교작업해서 여부 결정 (막 쓰면 비교 작업때문에 오히려 성능 내려갈 수 도 있음)

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

    let [count, setCount] = useState(0);

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={() => {setCount(count++)}}>count++재렌더링</button>
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