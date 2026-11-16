import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { useUserSync } from "../../../hooks/useUserSync";

export default function ProtectedRoutesLayout() {
    const { isLoaded, isSignedIn } = useAuth()
    useUserSync();
    if (!isLoaded) return null;
    if (!isSignedIn) return <Redirect href="/sign-up" />

    return <Stack screenOptions={{ headerShown: false }} />
}