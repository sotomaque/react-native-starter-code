import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParamList } from './HomeParamList'
import { Center } from '../Components/Center';
import { Text } from 'react-native';

interface HomeStackProps {

}

const Stack = createStackNavigator<HomeParamList>();

function Feed() {
    return (
        <Center>
            <Text>Feed</Text>
        </Center>
    )
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
        return (
            <Stack.Navigator>  
                <Stack.Screen name="Feed" component={Feed} />
            </Stack.Navigator>
        );
}