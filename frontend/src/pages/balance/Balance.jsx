import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./balance.css";

export default function Balance() {
  let { user } = useContext(AuthContext);
  const transactionNumber = useRef();
  const [balance, setBalance] = useState(user.balance);
  const depositHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/users/${user._id}/balance/deposit`, {
        transactionNumber: transactionNumber.current.value,
      });
      setBalance(res.data.data.balance);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="balancePage">
      <Sidebar creator={user.isCreator} />
      {!user.isCreator ? (
        <div className="balanceRight">
          <div className="depositBalance">
            <form className="getStarted-form" onSubmit={depositHandler}>
              <input
                placeholder="username"
                type="text"
                required
                className="loginInput"
                ref={transactionNumber}
              />
              <button className="btn-light becomeSupporter-btn">Deposit</button>
            </form>
          </div>
          <div className="balanceDisplay">
            <h1>Balance is {balance}</h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
