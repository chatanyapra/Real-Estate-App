import { Image, ScrollView, View } from 'react-native'

export default function SignUp() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className='bg-white'
            keyboardShouldPersistTaps='handled'
        >
            <View className='flex-1 justify-center px-6 py-12 bg-white'>
                <Image source={require("@/assets/images/auramicimage.png")}
                    className='w-40 h-24 mb-8'
                    resizeMode='contain'
                />
            </View>
        </ScrollView>
    )
}
