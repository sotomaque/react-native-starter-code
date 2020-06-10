import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppParamList } from './AppParamList'
import { Center } from './Center'
import { Text, Button } from 'react-native'
import { AuthContext } from './AuthProvider'

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>()

function Home() {
    const { logout } = React.useContext(AuthContext);

    return (
        <Center>
            <Text>Home</Text>
            <Button title='Logout' onPress={() => logout()} />
        </Center>
    )
}
function Search() {
    return (
        <Center>
            <Text>Search</Text>
        </Center>
    )
}

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
        return (
            <Tabs.Navigator>
                <Tabs.Screen name='Home' component={Home} />
                <Tabs.Screen name='Search' component={Search} />
            </Tabs.Navigator>
        );
}