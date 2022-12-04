import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthService from "../service/auth.service";

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user === null) {
            Router.replace("/");
            return null;
          } else {
            setVerified(true);
          }
    }, [Router]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;