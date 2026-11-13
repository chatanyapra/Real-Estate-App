import { useSignIn } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {

    const { signIn, errors, fetchStatus } = useSignIn();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [code, setCode] = useState("");
    const isLoading = fetchStatus == "fetching";
    const supportedSecondFactors = signIn.supportedSecondFactors ?? [];
    const phoneCodeFactor = supportedSecondFactors.find(
        (factor) => factor.strategy === "phone_code"
    );
    const emailCodeFactor = supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code"
    );

    const onSignInPress = async () => {
        const { error } = await signIn.password({
            emailAddress: email,
            password
        })
        if (error) {
            alert(error.message);
            console.error(JSON.stringify(error, null, 2));
            return;
        }

        const nextSupportedSecondFactors = signIn.supportedSecondFactors ?? [];
        const nextPhoneCodeFactor = nextSupportedSecondFactors.find(
            (factor) => factor.strategy === "phone_code"
        );
        const nextEmailCodeFactor = nextSupportedSecondFactors.find(
            (factor) => factor.strategy === "email_code"
        );

        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask);
                        return;
                    }
                    const url = decorateUrl("/");
                    router.replace(url as any);
                }
            })
        } else if (signIn.status === "needs_second_factor") {
            if (nextPhoneCodeFactor) {
                await signIn.mfa.sendPhoneCode();
            } else if (nextEmailCodeFactor) {
                await signIn.mfa.sendEmailCode();
            }
        } else if (signIn.status === "needs_client_trust") {
            if (nextPhoneCodeFactor) {
                await signIn.mfa.sendPhoneCode();
            } else if (nextEmailCodeFactor) {
                await signIn.mfa.sendEmailCode();
            }
        } else {
            console.error("Sign-in attempt not complete:", signIn);
        }
    }
    const onVerifyPress = async () => {
        const currentSupportedSecondFactors = signIn.supportedSecondFactors ?? [];
        const currentPhoneCodeFactor = currentSupportedSecondFactors.find(
            (factor) => factor.strategy === "phone_code"
        );
        const currentEmailCodeFactor = currentSupportedSecondFactors.find(
            (factor) => factor.strategy === "email_code"
        );

        if (currentPhoneCodeFactor) {
            await signIn.mfa.verifyPhoneCode({ code });
        } else if (currentEmailCodeFactor) {
            await signIn.mfa.verifyEmailCode({ code });
        }

        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask);
                        return;
                    }
                    const url = decorateUrl("/");
                    router.replace(url as any);
                }
            })
        }
    }
    if (signIn.status === "needs_second_factor" || signIn.status === "needs_client_trust") {
        const usePhoneVerification = Boolean(phoneCodeFactor);
        return (
            <View className='flex-1 justify-center px-6 py-12 bg-white'>
                <Image source={require("@/assets/images/rivo-logo.png")}
                    className='w-40 h-16 mb-4'
                    resizeMode='contain'
                />
                <Text className='text-3xl font-bold text-gray-800'>Verify your account</Text>
                <Text className='text-gray-500 mb-8'>We sent a code to {usePhoneVerification ? "your phone" : email}</Text>
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
                    onPress={() => {
                        if (phoneCodeFactor) {
                            signIn.mfa.sendPhoneCode();
                            return;
                        }

                        if (emailCodeFactor) {
                            signIn.mfa.sendEmailCode();
                        }
                    }}
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
                <Text className='text-3xl font-bold text-gray-800'>Welcome back</Text>
                <Text className='text-gray-500 mb-8'>Sign in to your account</Text>

                <TextInput
                    className='w-full border border-[#acacac] rounded-xl px-4 py-3 mb-4'
                    placeholder='Email'
                    placeholderTextColor={"#acacac"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                {errors.fields.identifier && (
                    <Text className='text-red-500 mb-4'>
                        {errors.fields.identifier.message}
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
                    onPress={onSignInPress}
                    disabled={isLoading}
                    className='w-full bg-[#F0AD3D] py-4 rounded-xl items-center mb-4'
                >
                    {isLoading ? (
                        <ActivityIndicator color={"white"} />
                    ) : (
                        <Text className='text-white font-bold text-base'>Sign In</Text>
                    )}
                </TouchableOpacity>
                <View className='flex-row justify-center'>
                    <Text className='text-gray-500'>Don&apos;t have an account? </Text>
                    <Link href="./sign-up">
                        <Text className='text-blue-600 font-semibold'>Sign Up</Text>
                    </Link>
                </View>
                <View nativeID='clerk-captcha'></View>
            </View>
        </ScrollView>
    )
}
