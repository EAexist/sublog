import { GoogleLoginButton } from "./GoogleLoginButton";
import { GuestLoginButton } from "./GuestLoginButton";

export const LoginButtonGroup = () => {

    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <GoogleLoginButton />
            <GuestLoginButton />
        </div>
    );
};
