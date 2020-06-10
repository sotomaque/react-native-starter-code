import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParamList } from './HomeParamList'
import { Center } from '../../Components/Center';
import { Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../AuthProvider';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed() {
    return (
        <Center>
            <Text>Feed</Text>
        </Center>
    )
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
    const { logout } = React.useContext(AuthContext);

    return (
        <Stack.Navigator>  
            <Stack.Screen 
                name="Feed" 
                component={Feed} 
                options={{
                    headerRight: () => {
                        return (<TouchableOpacity onPress={() => { logout() }} style={{margin: 10}}><Text>Logout</Text></TouchableOpacity>)
                    }
                }}
            />
        </Stack.Navigator>
    );
}