import { GuestLoginButton } from "./GuestLoginButton";
import { TestAppGoogleLoginButton } from "./TestAppGoogleLoginButton";

export const LoginButtonGroup = () => {

    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <TestAppGoogleLoginButton />
            <GuestLoginButton />
        </div>
    );
};
