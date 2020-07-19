import React from "react";
import { Animated, Dimensions } from "react-native";

class FadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get("window").width),
    };
  }

  componentDidMount() {
    Animated.spring(this.state.positionLeft, {
      toValue: 0,
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ left: this.state.positionLeft }}>
        {/* Dans l'affichage, FadIn est devenue un component parent
        Et dans react native, les coponents parents doivent retourner leur enfant
        pour ce faire on va utiliser ceci :  */}
        {this.props.children} 
      </Animated.View>
    );
  }
}

export default FadeIn
