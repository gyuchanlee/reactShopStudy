import axios from "axios";
import {useState} from "react";

const Boot = () => {

    let [data, setData] = useState({});
    // studyGit/hoo788/bootPractice 스프링 프로젝트로 연동 시도 ㄱㄱ

    return (
        <div>
            <a onClick={() => {
                axios.get('http://localhost:8080/data/1')
                    .then((response) => {
                        console.log(response.data);
                    })
            }}>data1값 가져오기</a>
            <br/>
            <a onClick={() => {
                axios.get('http://localhost:8080/data/2')
                    .then((response) => {
                        console.log(response.data);
                    })
            }}>data2값 가져오기</a>
            <br/>
            <a onClick={() => {
                axios.get('http://localhost:8080/data/3')
                    .then((response) => {
                        console.log(response.data);
                    })
            }}>data3값 가져오기</a>
            <br/>
            <a onClick={() => {
                axios.get('http://localhost:8080/data/4')
                    .then((response) => {
                        console.log(response.data);
                    })
            }}>data4값 가져오기</a>
            <br/>
        </div>
    )
}

export default Boot;