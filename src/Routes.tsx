import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, AsyncStorage } from 'react-native'
import { Center } from './Components/Center'
import { AuthContext } from './AuthProvider'
import { AppTabs } from './Authenticated/AppTabs'
import { AuthStack } from './Unauthenticated/AuthStack'


interface RoutesProps { }


export const Routes: React.FC<RoutesProps> = ({ }) => {

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
            { user ? <AppTabs /> : <AuthStack /> }
        </NavigationContainer>
    );
}