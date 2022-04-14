import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Onboard from '../onboard/Onboard'

import style from "./home.module.scss"

export default function Home() {
    
    return (
        <> 
            <div id="home" className={style.home + " container-fluid mx-auto p-0"}>
                <div className={style.main + ' row col-12 mx-auto'}>
                    <div className={style.navbar + " row col-12 px-3 py-2"}>
                        <NavLink to="/" className={style.logo + "  col-8"}>Sparks Transfer</NavLink>
                        <h3 className='col-4  px-md-3 py-1 text-center'>Jayraj Parki</h3>
                    </div>
                    <div className={style.content + " row  col-10 mx-auto p-0 py-5"}>
                        <div className={style.left + " col-md-6  my-auto p-3"}>
                            <h1>QuickPay</h1>
                            <h1>Best Money Transfer System</h1>
                            <ul>
                                <li>Transfer Money</li>
                                <li>See All Customers</li>
                                <li>See Transaction History</li>
                                <li>Get Real Time Updates</li>
                            </ul>
                        </div>
                        <div className={style.right + " col-md-6 my-auto p-3"}>
                            <img className='w-100 ' src="/images/2.jpg" alt="Opps Sorry" />
                        </div>
                    </div>
                </div>
                <Onboard/>
                <div className={style.footer + " row col-12 mx-auto py-2"}>
                    <span className='text-center'>All &copy; copyrights reserved by QuickPay </span>
                </div>
            </div>
        </>
    )
}
