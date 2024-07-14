import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            label={"User Name"}
            placeholder={"madhvisuri2222@gmail.com"}
            // func={setUsername}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            // func={setPassword}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            label={"Sign In"}
            onClick={async () => {
              console.log("clicked");
              const resp = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                { username, password }
              );
              localStorage.setItem("token", resp.data.token);
              navigate("/");
            }}
          />
          <BottomWarning
            label={"Don't have an account ?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
