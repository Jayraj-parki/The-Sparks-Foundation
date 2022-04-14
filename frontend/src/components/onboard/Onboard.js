import React,{useState} from 'react'
import style from "./onboard.module.scss"
import Customers from '../customers/Customers'
import HIstory from '../history/HIstory'
import Transfer from '../transfer/Transfer'
import { HashLink as Link } from "react-router-hash-link"
export default function Onboard() {
    const [state, setState] = useState(0);
    const changeState = (id) => {
        setState(id)
    }
    return ( 
        <>
            <div className={style.onboard + ' row col-lg-9 mx-auto px-3'}>
                <div className={style.content + " row col-12 mx-auto my-3"}>
                    <div className={style.image + " col-md-6 p-2 d-flex"}>
                        <img src="/images/transfer.png" className='w-100 my-auto' alt="" />
                    </div>
                    <div className={style.details + " col-md-6"}>
                        <h1>Transfer money</h1>
                        <p>Hey, do you want to transfer money? </p>
                        <p>User our <span>QuickPay</span> for quick money transfe. click Transfer button to transfer money..!</p>
                        <Link smooth to="#transfer" onClick={() => changeState(1)} className={style.button + ' px-3 py-2'}>Transfer Money</Link>
                    </div>
                </div>
                <div className={style.content + " row col-12 mx-auto my-3"}>
                    <div className={style.details + " col-md-6 order-2 order-md-1"}>
                        <h1>See All Customer</h1>
                        <p>Chekc here all cutomers. </p>
                        <p>You can also see balance of all customers and to check transaction history of specific user you can click on view button...!  </p>
                        <Link smooth to="#customer" onClick={() => changeState(2)} className={style.button + ' px-3 py-2'}>All Customer</Link>
                    </div>
                    <div className={style.image + " col-md-6 p-2 d-flex order-1 order-md-2"}>
                        <img src="/images/customer.png" className='w-100 my-auto' alt="" />
                    </div>
                </div>
                <div className={style.content + " row col-12 mx-auto my-3"}>
                    <div className={style.image + " col-md-6 p-2 d-flex "}>
                        <img src="/images/transaction.webp" className='w-100 my-auto' alt="" />
                    </div>
                    <div className={style.details + " col-md-6 "}>
                        <h1>Transaction History</h1>
                        <p>Check Transaction of all Customers here </p>
                        <p>You can check failed or succeed transaction. Also you can filter them based on status of transaction..!</p>
                        <Link smooth to="#history" onClick={() => changeState(3)} className={style.button + ' px-3 py-2'}>Transaction History</Link>
                    </div>
                </div>
            </div>
            <hr className='col-10 mx-auto' />
            {state!=0 && <span className={style.cancel + " row col-12 mx-auto p-2  m-0"}><Link smooth to="#home" onClick={()=>changeState(0)} className='col-auto ms-auto px-3 py-2'>Cancel</Link></span>}
            {state == 1 && <Transfer />}
            {state == 2 && <Customers />}
            {state == 3 && <HIstory />}

        </>
    )
}
