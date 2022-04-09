import React, { useState, useEffect } from 'react'
import style from "./customer.module.scss"
export default function Customers() {
    const [user, setUser] = useState(null);
    const [activeUser, setActiveUser] = useState(null);
    const [state, setState] = useState(null);
    const [userTransaction, setUserTransaction] = useState(null);
    const getAllCustomer = async () => {
        try {

            const result = await fetch((`/getAllCustomer/`), {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })
            const data = await result.json();
            if (result.status === 200) {
                setUser(data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const getUserCustomer = async (id) => {
        try {
            const active=user?.filter((val)=>val._id==id)[0]
            console.log(active)
            setState(active)
            setActiveUser(id)
            const result = await fetch((`/getTransactionByUser/${id}`), {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })
            const data = await result.json();
            if (result.status === 200) {
                // console.log(data)
                setUserTransaction(data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllCustomer()
    }, [])

    return (
        <div id="customer" className={style.customer + " row col-12 mx-auto py-2 "}>
            <h3 className='  col-auto mx-auto border-light border-bottom pb-2'>QuickPay's All Cutomer Details</h3>
            <div className={style.wrapper + " row col-9 mx-auto  p-0 d-flex justify-content-between align-items-center"}>
                <div className={style.content + " m-0 mt-2 p-3"}>
                    <table className="table text-center m-0 border-warning">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Watch History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.map((val, idx) =>
                                <tr>
                                    <th scope="row">{idx}</th>
                                    <td>{val.username}</td>
                                    <td>{val.balance}$</td>
                                    <td>
                                        <span onClick={() => getUserCustomer(val._id)} >
                                            View
                                        </span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {
                    activeUser &&
                    <div className={style.content + " m-0 mt-2 p-3"}>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item p-0 m-0 border-0 bg-transparent">
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className={style.alert + " alert alert-warning border-0 p-2 outline-none m-0"} role="alert">
                                        <h4 className="accordion-header p-2 px-3" id="headingOne">
                                            {state?.username}'s Transaction History
                                        </h4>
                                        <h6 className=' px-3'>Avl. Bal.:- {state?.balance}$</h6>
                                    </div>
                                    <div className="accordion-body">
                                        <table class="table text-center m-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Transaction Id</th>
                                                    <th scope="col">Sender</th>
                                                    <th scope="col">Reciever</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Debit/credit</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userTransaction?.map((val) =>
                                                        <tr>
                                                            <td>{val?._id}</td>
                                                            <td>{val.senderName}</td>
                                                            <td>{val.recieverName}</td>
                                                            <td>{val.amount}</td>
                                                            <td>
                                                                {
                                                                    val.status!=="success"?
                                                                    "--"
                                                                    :
                                                                    val.sender == activeUser ?
                                                                        "Debit"
                                                                        :
                                                                        "Credit"
                                                                }
                                                            </td>
                                                            <td>{val.date.split("G")[0].toString()}</td>
                                                            {
                                                                val.status === "success" ?
                                                                    <td className={style.status_success}>{val.status}</td>
                                                                    :
                                                                    <td className={style.status_failed}>{val.status}</td>
                                                            }
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
