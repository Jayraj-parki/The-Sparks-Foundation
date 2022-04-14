import React, { useState,useEffect } from 'react'
import style from "./history.module.scss"
export default function HIstory() {
    const [history, setHistory] = useState(null)
    const getTransactionHistory=async()=>{
        try{
            
            const result = await fetch((`/getAllTransaction/`), {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                
            })
            const data = await result.json();
            if (result.status === 200) {
                setHistory(data);
            }
           
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getTransactionHistory()
    },[])
    return (
        <div id="history" className={style.history + " row col-12 mx-auto py-3 pb-5  "}>
            <h3  className='  col-auto mx-auto border-light border-bottom pb-2'>QuickPay's Overall Transaction History</h3>
            <div className={style.wrapper + " row col-11 col-md-9 mx-auto  p-0 d-flex justify-content-between align-items-center"}>
                <div className={style.content + " m-0 mt-2 p-3"}>
                    <table class="table text-center m-0 border-warning">
                        <thead>
                            <tr>
                                <th scope="col">Transaction Id</th>
                                <th scope="col">Sender</th>
                                <th scope="col">Reciever</th>
                                <th scope="col">Amount</th>
                                <th scope="col">date</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history?.map((val) =>

                                    <tr>
                                        <td>{val._id}</td>
                                        <td>{val.senderName}</td>
                                        <td>{val.recieverName}</td>
                                        <td>{val.amount}</td>
                                        <td>{val.date.split("G")[0].toString()}</td>
                                        {
                                            val.status==="success" ?
                                            <td className={style.status_success}>{val.status}</td>
                                            :
                                            <td className={style.status_failed}>{val.status}</td>

                                        }
                                    </tr>
                                )
                            }
                            {/* <tr>
                                <td>jwhegfjhwqejfwf</td>
                                <td>Jayraj Parki</td>
                                <td>Rohit Pandey</td>
                                <td>928137</td>
                                <td>15 july 20:32:32</td>
                                <td className={style.status_failed}>Failed</td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
