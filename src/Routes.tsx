import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native'
import { Text, Button, ActivityIndicator, AsyncStorage } from 'react-native'
import { Center } from './Center'
import { AuthParamList, AuthNavProps } from './AuthParamList'
import { AuthContext } from './AuthProvider'
import { AppTabs } from './AppTabs'


interface RoutesProps {

}

const Stack = createStackNavigator<AuthParamList>()

function Login({ navigation } : AuthNavProps<'Login'> ) {
    const { login } = React.useContext(AuthContext);

    return (
        <Center>
            <Text>Login Screen</Text>
            <Button title="Log Me In" onPress={() => login()} />
            <Button title="Register" onPress={() => {
                navigation.navigate('Register')
            }} />
        </Center>
    )
}

function Register({ navigation, route } : AuthNavProps<'Register'> ) {
    return (
        <Center>
            <Text>Register Screen</Text>
            <Text>Route Name: {route.name} </Text>
            <Button title="Login" onPress={() => {
                navigation.navigate('Login')
            }} />
        </Center>
    )
}

export const Routes: React.FC<RoutesProps> = ({}) => {

    const { login, logout, user } = React.useContext(AuthContext)
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        AsyncStorage.getItem('user')
            .then(userString => {
                if (userString) {
                    // decode it
                    login()
                }

                setLoading(false);            
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, [])

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    return (
        <NavigationContainer>
            {
                user ? <AppTabs /> : 
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name='Login' options={{
                        headerTitle: 'Sign In'
                    }} component={Login} />
                    <Stack.Screen name='Register' options={{
                        headerTitle: 'Sign Up'
                    }} component={Register} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
}