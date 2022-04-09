import React, { useState, useEffect } from 'react'
import style from "./transfer.module.scss"
export default function Transfer() {
    const [user, setUser] = useState(null);
    const [sender, setSender] = useState(null);
    const [state, setstate] = useState(false);
    const [amount, setAmount] = useState(null);
    const [reciever, setReciever] = useState(null);
    const [activeSender, setActiveSender] = useState({
        username: "",
        balance: 0
    });
    const [activeReciever, setActiveReciever] = useState({
        username: "",
        balance: 0
    });

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

    const transferMoney = async () => {
        if (!sender || !reciever || !amount) {
            alert("Please fill all required fields!")
        }
        else {

            try {

                const result = await fetch((`/addTransaction/`), {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        sender,
                        senderName: activeSender?.username,
                        recieverName: activeReciever?.username,
                        senderBal: +activeSender?.balance,
                        recieverBal: +activeReciever?.balance,
                        reciever,
                        amount,
                        status: "success"
                    })
                })
                const data = await result.json();
                if (result.status === 200) {
                    alert(data)
                    setAmount("")
                    setstate(!state)
                }
                else if (result.status === 404) {
                    alert(data)
                    setstate(!state)
                    setAmount("")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }
   
    useEffect(() => {
        getAllCustomer()
    }, [state])

    useEffect(() => {
        const data = user?.filter((val) => val._id === sender)[0]
        setActiveSender(data)
    }, [sender,user])

    useEffect(() => {
        const data = user?.filter((val) => val._id === reciever)[0]
        setActiveReciever(data)
    }, [reciever,user])
    return (
        <div id="transfer" className={style.transfer_money + " row col-12 mx-auto py-3 pb-5 "}>
            <h3 className='  col-auto mx-auto border-light border-bottom pb-2'>QuickPay Money Transfer</h3>
            <div className={style.wrapper + " row col-9 mx-auto  p-0 d-flex justify-content-between align-items-center"}>
                <div className={style.alert + " alert alert-warning my-2 mb-4"} role="alert">
                    Transfer Money thorught QuickPay
                </div>

                <div className={style.sender + "  col-4  px-4 py-3 m-0"}>
                    <select value={sender} onChange={(e) => setSender(e.target.value)} className='form-select row col-12 mx-auto ' name="" id="">
                        <option value="Select a sender" selected disabled>Select a Sender</option>
                        {
                            user?.map((val) =>
                                <option value={val._id} >{val.username}</option>
                            )
                        }

                    </select>
                    <div className={style.customer_details + " m-0 mt-2 p-0"}>
                        <table className='table m-0 p-0'>
                            <tbody>
                                <tr>
                                    <td>Name :</td>
                                    <td>{activeSender?.username || "Not selected"}</td>
                                </tr>
                                <tr>
                                    <td>Avl. bal. :</td>
                                    <td>{activeSender?.balance || "Not selected"}$</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={style.amountToPay + " col-3  px-4 py-3"}>
                    <div className="mb-3">
                        <label for="amount" className="form-label">Enter amount to Transfer</label>
                        <input name="amt" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" type="Number" id="amount" placeholder='Amount' />
                    </div>
                </div>
                <div className={style.reciever + " col-4  px-4 py-3"}>
                    <select value={reciever} onChange={(e) => setReciever(e.target.value)} className='form-select row col-12 mx-auto ' name="" id="">
                        <option value="Select a reciever" selected disabled>Select a Reciever</option>
                        {
                            user?.map((val) =>
                                <option value={val._id} >{val.username}</option>
                            )
                        }
                    </select>

                    <div className={style.customer_details + " m-0 mt-2 p-0"}>
                        <table className='table m-0 p-0'>
                            <tbody>
                                <tr>
                                    <td>Name :</td>
                                    <td>{activeReciever?.username || "Not selected"}</td>
                                </tr>
                                <tr>
                                    <td>Avl. bal. :</td>
                                    <td>{activeReciever?.balance || "Not selected"}$</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={style.confirm + " col-3  p-0 mx-auto "}>
                    <button onClick={transferMoney} className={"row col-12 mx-auto px-3 py-2   d-flex justify-content-center "}>Transfer Money</button>
                </div>
            </div>
        </div>
    )
}
