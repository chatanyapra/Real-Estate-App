import { useAuth } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
    const { signOut } = useAuth();
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }
    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>SignOut</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}