import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button, Container, Nav, Navbar, Row, Col, Spinner } from 'react-bootstrap';
import {createContext, useEffect, useState} from "react";
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from "./routes/detail";
import axios from "axios";
import Cart from "./routes/Cart";

const MokokoCard = (props) => {
    return (
        <Col>
            <img src={props.mokoko.src} width="80%" alt="dd" onClick={() => props.navigate('/detail/'+props.mokoko.id)} />
            <h4>{props.mokoko.title}</h4>
            <p style={{fontWeight : "bold"}}>{props.mokoko.content}</p>
            <p>{props.mokoko.price}</p>
        </Col>
    )
}

const MainPage = (props) => {

    let [btnCount, setBtnCount] = useState(0);
    let [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className='main-bg'></div>
            <div>
                <h1>최근 본 상품</h1>
                {
                    localStorage.getItem('watched') && JSON.parse(localStorage.getItem('watched')).map((watchedId, i) => {
                        return (
                                <img key={i} src={props.mokokos[watchedId].src} width="50px" height="50px" alt="dd"
                                     onClick={() => props.navigate('/detail/' + props.mokokos[watchedId].id)}/>
                        )
                    })
                }
            </div>
            {
               isLoading ?  <Spinner/> : null
            }
            <Container>
                <Row md={4}>
                    {
                        props.mokokos.map((mokoko, i) => {
                            return (
                                <MokokoCard mokoko={mokoko} key={mokoko.id} navigate={props.navigate}></MokokoCard>
                            )
                        })
                    }
                </Row>
            </Container>
            <button onClick={() => {

                let num = 2;
                if (btnCount === 0) {
                    num = 2;
                } else if (btnCount === 1) {
                    num = 3;
                } else {
                    alert('더 이상 가져올 정보가 없습니다')
                    return;
                }

                // 로딩 중 UI 띄우기 코드
                setIsLoading(true);

                axios.get('https://codingapple1.github.io/shop/data'+ num +'.json')
                    .then((result) => {
                        console.log(result.data);
                        let copy = [...props.mokokos];
                        // concat() 써도 됨.
                        result.data.forEach((item) => {
                            let newItem = {
                                id: item.id,
                                src: '/img/토끼공장.gif',
                                title: item.title,
                                content: item.content,
                                price: item.price,
                            }
                            copy.push(newItem);
                        })
                        props.setMokokos(copy);
                        setBtnCount(++btnCount);

                        // 로딩 중 UI 숨기기
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        // 로딩 중 UI 숨기기
                        setIsLoading(false);
                    });
            }}>더 보 기
            </button>
        </>
    )
};


// About Page
const About = () => {
    return (
        <div>
            <h1>모코코 주식회사</h1>
            <h4>금강선 회장</h4>
            {/* nested routes의 요소를 보여줄 구멍 */}
            <Outlet></Outlet>
        </div>
    )
}

// evnet page
const Event = () => {
    return (
        <div>
            <h1>오늘의 이벤트</h1>
            <Outlet></Outlet>
        </div>
    );
}

// export let Context1 = createContext();

function App() {

    useEffect(() => {
        if (localStorage.getItem('watched') === null || localStorage.getItem('watched') === undefined) {
            localStorage.setItem('watched', JSON.stringify( [] ))
        }
    }, []);

    // localStorage 써보기
    let obj = {name : '망그러진곰'}
    // JSON으로 바꿔 보내면 객체도 보낼 수 있음 -> 약간의 편법
    localStorage.setItem('data', JSON.stringify(obj));
    let item = localStorage.getItem('data');
    console.log(JSON.parse(item));
    // 객체처럼 필드 꺼내쓰고 싶을 땐 JSON.parse() 사용하기
    console.log(JSON.parse(item).name);

    let [mokokos, setMokokos] = useState(data);
    let [quantity, setQuantity] = useState([10, 11, 12, 13, 14]);


    // 페이지 이동을 도와주는 함수를 저장해서 쓸 수 있음.
    let navigate = useNavigate();

    return (
        <div className="App">

            <Navbar className="bg-body-tertiary, navbarbar">
                <Container>
                    <Navbar.Brand onClick={ () => navigate('/') } style={{color: 'white'}}>
                        <img
                            alt=""
                            src="/img/thanksBean.gif"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        모코코 판매장
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link eventKey="1" onClick={ () => navigate('/') } className="navLinkText">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2" onClick={ () => navigate('/cart') } className="navLinkText">
                                장바구니
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2" onClick={() => navigate('/event')} className="navLinkText">
                                이벤트
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="3" onClick={ () => navigate('/detail') } className="navLinkText">
                                상세보기
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="4" onClick={ () => navigate('/about') } className="navLinkText">
                                문의사항
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                {/* Route 는 페이지같은 개념 */}
                <Route path="/" element={<MainPage mokokos={mokokos} setMokokos={setMokokos} navigate={navigate}/>}></Route>
                {/* url paramter = :변수명 으로 설정 */}
                <Route path="/detail/:id" element={<Detail mokokos={mokokos} />}/>
                {/* nested routes : 하위 주소를 가독성있게 표현 */}
                <Route path="/about" element={<About/>}>
                    {/* 하위의 요소를 보여줄려면 Outlet으로 상위 요소에 지정해줘야 함 -> 상위 요소안에 하위 요소를 넣어서 보여줌 */}
                    <Route path="member" element={<div>멤버임</div>}/>
                    <Route path="location" element={<div>로케이션임</div>}/>
                </Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/event" element={<Event/>}>
                    <Route path="one" element={<div><h4>모코코 인형이 무료</h4></div>}></Route>
                    <Route path="two" element={<div><h4>슈퍼 모모코 익스프레스 증정</h4></div>}></Route>
                </Route>
                <Route path="*" element={<div>404 Error Page</div>}/>
            </Routes>

        </div>
    );
}

export default App;
