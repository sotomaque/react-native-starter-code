import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppParamList } from './AppParamList'
import { Center } from '../Components/Center'
import { Text, Button } from 'react-native'
import { AuthContext } from '../Unauthenticated/AuthProvider'

import { Ionicons } from '@expo/vector-icons'

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
            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
        
                    if (route.name === 'Home') {
                        iconName = 'ios-home';
                    } else if (route.name === 'Search') {
                        iconName = 'ios-search';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tabs.Screen name='Home' component={Home} />
                <Tabs.Screen name='Search' component={Search} />
            </Tabs.Navigator>
        );
}