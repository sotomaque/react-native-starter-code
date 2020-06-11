import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductParamList } from '../common/ProductParamList';

export type SearchParamList = {
    Search: undefined;
} & ProductParamList;

export type SearchStackNavProps<T extends keyof SearchParamList> = {
    navigation: StackNavigationProp<SearchParamList, T>;
    route: RouteProp<SearchParamList, T>
}