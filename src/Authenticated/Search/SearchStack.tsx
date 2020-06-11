import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SearchParamList, SearchStackNavProps } from './SearchParamList';
import { Center } from '../../Components/Center';
import { Button, FlatList } from 'react-native';
import faker from 'faker'
import { addProductRoutes } from '../common/addProductRoutes';


interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

function Search({ navigation }: SearchStackNavProps<'Search'>) {
    const [showList, setShowList] = React.useState(false)
    return (
        <Center>
            <Button title='Search Products'  onPress={() => { setShowList(prev => !prev) }}/>
            {
                showList &&
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
            }
            
        </Center>
    )
}


export const SearchStack: React.FC<SearchStackProps> = ({}) => {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Search' component={Search} />
                { addProductRoutes(Stack as any) }
            </Stack.Navigator>
        );
}