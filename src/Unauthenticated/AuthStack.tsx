import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { AuthParamList, AuthNavProps } from './AuthParamList'
import { Center } from '../Components/Center'
import { Text, Button } from 'react-native';

import { AuthContext } from './AuthProvider'

interface AuthStackProps {}

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

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
        return (
            <Stack.Navigator initialRouteName='Login' screenOptions={{
                header: () => null
            }}>
                <Stack.Screen name='Login' options={{
                    headerTitle: 'Sign In'
                }} component={Login} />
                <Stack.Screen name='Register' options={{
                    headerTitle: 'Sign Up'
                }} component={Register} />
            </Stack.Navigator>
        );
}