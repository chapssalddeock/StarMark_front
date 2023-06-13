import { useRouter } from "next/router"

import NavBar from "../../components/NavBar/NavBar.js"
import NavBar2 from "../../components/NavBar/NavBar2.js"

// 레이아웃 속성 (즉, head body navBar, footer 등등을 여기에 끌어와서 정의)

import ContentArea from "../../components/ContentArea/ContentArea"


// 어느 페이지에서 없애는 조건부 렌더링을 할 건지 경로 정의
const Hidden = [
    "/"
]


export default function Layout(props) {
    const router = useRouter()
    const isHidden = Hidden.includes(router.asPath)

    return (
        <>
            {!isHidden && <NavBar />}
            {isHidden && <NavBar2 />}
            <div>{props.children}</div>
            <ContentArea />
        </>
    )
}