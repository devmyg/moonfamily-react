import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Authentication() {
  const [authView, setAuthView] = useState<boolean>(false);
  return (
    <>{authView ? <SignUp setAuthView={setAuthView} /> : <SignIn setAuthView={setAuthView} />}</>
  );
}
