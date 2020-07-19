import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/filmDetail'
import Favorites from '../Components/Favorites'

import Test from '../Components/Test'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: { //permet de définir des actions sur notre écran
            title: "Rechercher"
        }
    }, 
    FilmDetail: {
        screen: FilmDetail,
    },
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
        title: 'Favoris'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})


// Correspond à la barre d'onglet
const MoviesTabNavigator = createBottomTabNavigator({
    search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../Images/ic_search.png')}
                    style= {styles.icon}
                />
            }
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../Images/ic_favorite.png')}
                    style= {styles.icon}
                />
            }
        }
    },
    // Test: {
    //     screen: Test
    // }
}, {
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#DDDDDD', 
        inactiveBackgroundColor: '#FFFFFF'
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30

    }
})

export default createAppContainer(MoviesTabNavigator)
