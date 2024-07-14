import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="m-4">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
