import { useUser } from "@clerk/expo";
import { useUserStore } from "../store/userStore";

export const useUserSync = () => {
    const { user } = useUser();
    const setISAdmin = useUserStore((state) => state.
        setIsAdmin);
};