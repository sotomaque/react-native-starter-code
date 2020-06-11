import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParamList, HomeStackNavProps } from './HomeParamList'
import { Center } from '../../Components/Center';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { AuthContext } from '../../AuthProvider';
import faker from 'faker'
import { addProductRoutes } from '../common/addProductRoutes';


interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation } : HomeStackNavProps<'Feed'>) {
    return (
        <Center>
            <FlatList 
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(product, idx) => product + idx}
                data={Array.from(Array(50), () => faker.commerce.product())} 
                renderItem={({ item }) => {
                    return (
                        <Button title={item} onPress={() => {
                            navigation.navigate('Product', {
                                name: item
                            })
                        }} />
                    )
                } }
            />
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
            { addProductRoutes(Stack as any) }
        </Stack.Navigator>
    );
}