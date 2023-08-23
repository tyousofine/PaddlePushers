import { View, Image } from "react-native";
import Matter from "matter-js";

const Player = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;


  return (
    <View
      style={{
        width: props.size.width,
        height: props.size.height,
        left: xPos,
        top: yPos,
        backgroundColor: props.color,
        position: "absolute",
      }}>
    </View>
  );
};

export default (world, color, pos, size, extraOptions) => {
  const ThePlayer = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: extraOptions.label,
      restitution: 1,
      isStatic: true,
    }
  );
  Matter.World.add(world, ThePlayer);
  return { body: ThePlayer, color, pos, size, extraOptions, renderer: <Player /> };
};