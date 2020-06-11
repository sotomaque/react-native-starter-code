import React from "react";
import { HomeParamList, HomeStackNavProps } from "../Home/HomeParamList";
import { TouchableOpacity, Text, Button } from "react-native"
import { Center } from "../../Components/Center";
import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { SearchParamList, SearchStackNavProps } from "../Search/SearchParamList";

function Product({ navigation, route }: HomeStackNavProps<"Product"> | SearchStackNavProps<"Product">) {
    return (
        <Center>
            <Text>{route.params.name}</Text>
            <Button title={`Edit ${route.params.name}`} onPress={() => navigation.navigate('EditProduct', {
                name: `${route.params.name}`
            })} />
        </Center>
    )
}

function EditProduct({ route, navigation }: HomeStackNavProps<"EditProduct"> | SearchStackNavProps<"Product">) {
    const [formState] = React.useState();

    const submit = React.useRef(() => { });

    submit.current = () => {
        // api call saving form state
        console.log('SUBMITTING FORM FROM HEADER!')
        navigation.goBack()
    }

    React.useEffect(() => {
        navigation.setParams({ submit });
    }, [])

    return (
        <Center>
            <Text>Edit {route.params.name}</Text>
        </Center>
    )
}

export const addProductRoutes = (Stack: TypedNavigator<HomeParamList | SearchParamList, StackNavigationState, any, any, any>) => {
    return (
        <>
            <Stack.Screen
                name="Product"
                component={Product}
                options={({ route } : any) => ({
                    headerTitle: `Product: ${route.params.name}`
                })}
            />
            <Stack.Screen
                name="EditProduct"
                component={EditProduct}
                options={({ route } : any) => ({
                    headerTitle: `Edit: ${route.params.name}`,
                    headerRight: () => (
                        <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                            // submit form if submit exists
                            route.params.submit?.current()
                        }}>
                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>Done</Text>
                        </TouchableOpacity>
                    )
                })}
            />
        </>
    )
}