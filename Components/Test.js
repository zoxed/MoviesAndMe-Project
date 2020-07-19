// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Animated, Easing, Dimensions, PanResponder } from 'react-native'
import helloWorld from './HelloWorld'
import HelloWorld from './HelloWorld.android'

class Test extends React.Component {

// ============================Animated============================ 

//     constructor(props) {
//         super(props)
//         this.state = {
//             topPosition: new Animated.Value(0),
//             leftPosition: new Animated.Value(0)
//         }
//     }

//     componentDidMount() {
//         // Animated.timing(
//         //     this.state.topPosition,
//         //     {
//         //         toValue: 100,
//         //         duration: 1000,
//         //         easing: Easing.elastic(10)
//         //     }
//         // Animated.spring(
//         //     this.state.topPosition,
//         //     {
//         //         toValue: 100,
//         //         speed: 4,
//         //         bounciness: 30
//         //     }
//         // Animated.decay(
//         //     this.state.topPosition,
//         //     {
//         //         velocity: 0.6,
//         //         deceleration: 0.997,
//         //     }
//         // Animated.sequence([
//         //     Animated.spring(
//         //       this.state.topPosition,
//         //       {
//         //         toValue: 100,
//         //         tension: 8,
//         //         friction: 3
//         //       }
//         //     ),
//         //     Animated.timing(
//         //       this.state.topPosition,
//         //       {
//         //         toValue: 0,
//         //         duration: 1000,
//         //         easing: Easing.elastic(2)
//         //       }
//         //     )
//         //   ]
//         Animated.parallel([
//             Animated.spring(
//             this.state.topPosition,
//             {
//                 toValue: 100,
//                 tension: 8,
//                 friction: 3
//             }
//             ),
//             Animated.timing(
//             this.state.leftPosition,
//             {
//                 toValue: 100,
//                 duration: 1000,
//                 easing: Easing.elastic(2)
//             }
//             )
//         ]

//         ).start()
//     }

//   render() {
//     return (
//       <View style={styles.main_container}>
//         {/* <View style={styles.subview_container}> */}
//         {/* </View> */}
//         <Animated.View style={[styles.animated_view, { top: this.state.topPosition, left: this.state.leftPosition }]}></Animated.View>
//         {/* <HelloWorld />  */}
//         {/* React native est capable tout seul d'aller chercher le bon component selon la plateforme */}
//       </View>
//     )
//   }

// ============================PanResponder============================

constructor(props) {
    super(props)
    this.state = {
      topPosition: 0,
      leftPosition: 0,
    }
    
    var {height, width} = Dimensions.get('window');
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            let touches = evt.nativeEvent.touches;
            if (touches.length == 1) {
                this.setState({
                  topPosition: touches[0].pageY - height/2,
                  leftPosition: touches[0].pageX - width/2
                })
            }
        }
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View
          {...this.panResponder.panHandlers}
          style={[styles.animated_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
        </View>
      </View>
    )
  }

}




const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
//   subview_container: {
//     backgroundColor: Platform.OS === 'ios' ? 'red' : 'green',
//     height: Platform.OS === 'ios' ? 100 : 50,
//     width: Platform.OS === 'ios' ? 50 : 100
//     // OR
//     // ...Platform.select({
//     //     ios: {
//     //         backgroundColor: 'red',
//     //         height: 100,
//     //         width: 50
//     //     },
//     //     android: {
//     //         backgroundColor: 'green',
//     //         height: 50,
//     //         width: 100
//     //     }
//     // }),
//   },
  animated_view: {
    backgroundColor: Platform.OS === 'ios' ? 'red' : 'green',
    height: Platform.OS === 'ios' ? 100 : 100,
    width: Platform.OS === 'ios' ? 100 : 100
  }
})

export default Test