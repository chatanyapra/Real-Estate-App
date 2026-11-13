import { useAuth, useSignUp } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {

    const { signUp, errors, fetchStatus } = useSignUp();
    const { isSignedIn } = useAuth();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [code, setCode] = useState("");
    const isLoading = fetchStatus == "fetching";

    if (signUp.status === "complete" || isSignedIn) {
        return null;
    }

    const onSignUpPress = async () => {
        const { error } = await signUp.password({
            emailAddress: email,
            password,
            firstName,
            lastName
        })
        if (error) {
            alert(error.message);
            console.error(JSON.stringify(error, null, 2));
            return;
        }
        if (!error) {
            await signUp.verifications.sendEmailCode();
        }
    }
    const onVerifyPress = async () => {
        await signUp.verifications.verifyEmailCode({
            code
        });
        if (signUp.status === "complete") {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl("/");
                    router.replace(url as any);
                }
            })
        }
    }
    if (signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0
    ) {
        return (
            <View className='flex-1 justify-center px-6 py-12 bg-white'>
                <Image source={require("@/assets/images/rivo-logo.png")}
                    className='w-40 h-16 mb-4'
                    resizeMode='contain'
                />
                <Text className='text-3xl font-bold text-gray-800'>Create Account</Text>
                <Text className='text-gray-500 mb-8'>We sent a code to {email}</Text>
                <TextInput
                    className='w-full border border-[#acacac] rounded-xl px-4 py-3'
                    placeholder='Enter verification code'
                    placeholderTextColor={"#acacac"}
                    keyboardType='number-pad'
                    autoCapitalize='words'
                    value={code}
                    onChangeText={setCode}
                />
                {errors.fields.code && (
                    <Text className='text-red-500 mb-4'>
                        {errors.fields.code.message}
                    </Text>
                )}
                <TouchableOpacity
                    onPress={onVerifyPress}
                    disabled={isLoading}
                    className='w-full bg-[#F0AD3D] py-4 rounded-xl items-center mb-4'
                >
                    {isLoading ? (
                        <ActivityIndicator color={"white"} />
                    ) : (
                        <Text className='text-white font-bold text-base'>Verify</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => signUp.verifications.sendEmailCode()}
                    disabled={isLoading}
                    className='py-2'
                >
                    <Text className='text-blue-600'>I need a new code</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className='bg-white'
            keyboardShouldPersistTaps='handled'
        >
            <View className='flex-1 justify-center px-6 py-12 bg-white'>
                <Image source={require("@/assets/images/rivo-logo.png")}
                    className='w-40 h-16 mb-4'
                    resizeMode='contain'
                />
                <Text className='text-3xl font-bold text-gray-800'>Create Account</Text>
                <Text className='text-gray-500 mb-8'>Find your dream home today</Text>
                <View className='flex-row gap-3 mb-4'>
                    <TextInput
                        className='flex-1 border border-[#acacac] rounded-xl px-4 py-3'
                        placeholder='First name'
                        placeholderTextColor={"#acacac"}
                        autoCapitalize='words'
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        className='flex-1 border border-[#acacac] rounded-xl px-4 py-3'
                        placeholder='Last name'
                        placeholderTextColor={"#acacac"}
                        autoCapitalize='words'
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
                <TextInput
                    className='w-full border border-[#acacac] rounded-xl px-4 py-3 mb-4'
                    placeholder='Email'
                    placeholderTextColor={"#acacac"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                {errors.fields.emailAddress && (
                    <Text className='text-red-500 mb-4'>
                        {errors.fields.emailAddress.message}
                    </Text>
                )}
                <TextInput
                    className='w-full border border-[#acacac] rounded-xl px-4 py-3 mb-4'
                    placeholder='Passoword'
                    placeholderTextColor={"#acacac"}
                    value={password}
                    onChangeText={setPassowrd}
                    secureTextEntry
                />
                {errors.fields.password && (
                    <Text className='text-red-500 mb-4'>
                        {errors.fields.password.message}
                    </Text>
                )}
                <TouchableOpacity
                    onPress={onSignUpPress}
                    disabled={isLoading}
                    className='w-full bg-[#F0AD3D] py-4 rounded-xl items-center mb-4'
                >
                    {isLoading ? (
                        <ActivityIndicator color={"white"} />
                    ) : (
                        <Text className='text-white font-bold text-base'>Sign Up</Text>
                    )}
                </TouchableOpacity>
                <View className='flex-row justify-center'>
                    <Text className='text-gray-500'>Already have an account? </Text>
                    <Link href="./sign-in">
                        <Text className='text-blue-600 font-semibold'>Sign In</Text>
                    </Link>
                </View>
                <View nativeID='clerk-captcha'></View>
            </View>
        </ScrollView>
    )
}
