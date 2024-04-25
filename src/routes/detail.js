import {useParams} from "react-router-dom";
import styled from "styled-components";
import React, {useEffect, useState, useRef, useContext} from 'react';
import {Container, Nav, Row} from "react-bootstrap";
import Context1 from "./../App.jsx";
import {addCart} from "../store";
import {useDispatch, useSelector} from "react-redux";

// 다른 js에는 간섭하지 않고 오직 detail.js의 스타일만 설정
// 버튼 스타일 설정
let MokokoBtn = styled.button`
    background-color: ${ props => props.bc };
    color: ${ props => props.bc == 'skyblue' ? 'white' : 'black' };
    padding: 10px;
`

// 스타일 복사 가능
let CopyBtn = styled(MokokoBtn)`
    margin: 5px;
`

let Box = styled.div`
    background-color: wheat;
    padding: 20px;
`

// 컴포넌트 생명 주기 중 코드를 실행 가능 -> 예전 방법
// class Detail2 extends React.Component {
//     componentDidMount() {
//         // mount 시 실행
//     }
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         // update 시 실행
//     }
//     componentWillUnmount() {
//         // unmount 시 실행
//     }
// }

// 상세보기 컴포넌트
const Info = (props) => {
    return (
        <>
            <div>
                <h1>상품 상세보기</h1>
                <h3>{props.mokokos[props.id].title}</h3>
                <h4>{props.mokokos[props.id].content}</h4>
            </div>
            <div>
                <h1></h1>
                <h4>기타 수치 정보</h4>
                <p>안전 검사 인증 정보</p>
            </div>
        </>
    )
}

// 리뷰 컴포넌트
const Review = () => {
    return (
        <>
            <Container>
                <Row md={1}>
                    <div>
                        <h1>2개 샀어요</h1>
                        <h3>정용철</h3>
                        <p>너무 귀여워요</p>
                        <hr/>
                    </div>
                </Row>
                <Row md={1}>
                    <div>
                        <h1>귀엽네요</h1>
                        <h3>이승훈</h3>
                        <p>굿굿</p>
                        <hr/>
                    </div>
                </Row>
                <Row md={1}>
                    <div>
                        <h1>너무 맘에 들어요</h1>
                        <h3>김승원</h3>
                        <p>제 가족 모두 다 샀어요</p>
                        <hr/>
                    </div>
                </Row>
            </Container>
        </>
    )
}

// 다른 상품 보기 컴포넌트
const Another = () => {
    return (
        <>
            <h1>사실</h1>
            <h3>아무것도</h3>
            <h4>없지롱</h4>
        </>
    )
}

const Detail = (props) => {

    let dispatch = useDispatch();
    let cartInfo = useSelector((state) => state.cartInfo)

    console.log(cartInfo)

    let [count, setCount] = useState(0);
    let [timerSwitch, setTimerSwitch] = useState(true);
    let [input, setInput] = useState(0);
    let [tapNum, setTapNum] = useState(0); // 0,1,2 로 탭 상태 나타내기
    let [fade, setFade] = useState('fade');


    // :id 로 받아온 파라미터를 담아옴
    let {id} = useParams();
    let findMokoko = props.mokokos.find(mokoko => mokoko.id == id);

    const quantityInput = useRef();

    // 상세페이지 들어 왔을 때, 최근 본 페이지 변수에 등록
    useEffect(() => {
        let watched = JSON.parse(localStorage.getItem('watched'));
        let find = watched.find(w => w == findMokoko.id);
        console.log('find ' + find);
        if (find === undefined || find === null) {
            let copy = [...watched, findMokoko.id];
            localStorage.setItem('watched', JSON.stringify(copy));
        }
    }, []);


    useEffect(() => {
        if (isNaN(input)) {
            alert('수량이니까 숫자 적으세요');
            setInput(0);
            quantityInput.current.value = '';
            quantityInput.current.focus();
        }
    }, []);

    // Hook
    useEffect(() => {
        // mount, update 시 실행

        // 타이머 역할
        let timer = setTimeout(() => {
            setTimerSwitch(false);
        }, 2000)

        console.log(1);

        return () => {
            // useEffect가 동작 전에 코드가 실행됨.
            // 기존 타이머는 제거하는 코드 -> 실수로 타이머가 여러개 만들어지는 비효율적인 상황 방지 가능.
            console.log('clean up')
            clearTimeout(timer); // 타이머 제거 가능
            // 재렌더링이 될 때, 기존의 서버 요청을 제거하는 코드를 추가 가능
            // clean up function -> mount 시 실행안됨 / unmount 시 실행됨
        }
    }, [count]);
    // [] : useEffect 실행 조건을 넣을 수 있는 곳
    // [count] : count가 변할때만 useEffect가 실행됨
    // [] : 컴포넌트가 장착될 때, 처음 1회만 실행시키고 싶을 때 사용.

    // tap 숫자 state가 변할때 마다 코드 실행
    useEffect(() => {
        setTimeout(() => {setFade('end')}, 100)
        // react18 -> automatic batching 기능
        // state가 변경하는 함수가 근처에 있으면 다 합쳐서 한번만 재렌더링을 수행함. (변할때 마다 재렌더링을 하지 않음) -> batch
        // 따라서 setTimeout으로 시간차를 둬서 떨어트림.

        // clean-up function
        return () => {
            setFade('');
        }
    }, [tapNum]);

    if (id > (props.mokokos.length - 1) || isNaN(id)) {
        return (
            <div>400 Error Page</div>
        );
    }

    return (
        <div className="container">
            {
                timerSwitch ?
                    <div className='alert alert-warning'>
                        2초 이내 구매 시, 할인
                    </div>
                    : null
            }

            <button onClick={() => {
                setCount(count++)
            }}>state 변경 + {count}</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={findMokoko.src} width="100%"/>
                </div>
                <div className="col-md-6">
                    <input type='text' onBlur={(e) => {
                        setInput(e.target.value);
                    }} ref={quantityInput}/>
                    <h4 className="pt-5">{findMokoko.title}</h4>
                    <p>{findMokoko.content}</p>
                    <p>{findMokoko.price}원</p>
                    <button className="btn btn-danger"
                        onClick={() => {
                            dispatch(addCart(findMokoko))
                        }}
                    >주문하기</button>
                </div>
            </div>

            {/*<Box>*/}
            {/*    <MokokoBtn bc="skyblue">버튼</MokokoBtn>*/}
            {/*</Box>*/}

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="tap0" onClick={() => {setTapNum(0)}}>상품 상세보기</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="tap1" onClick={() => {setTapNum(1)}}>리뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="tap2" onClick={() => {setTapNum(2)}}>다른 상품 보기</Nav.Link>
                </Nav.Item>
            </Nav>
            {/* Tab Contents */}
            <div className={`start ` + fade}>
                {
                    tapNum == 0 ? <Info mokokos={props.mokokos} id={id} /> : tapNum == 1 ?  <Review/> : <Another/>
                }
            </div>
        </div>
    )
}

export default Detail;