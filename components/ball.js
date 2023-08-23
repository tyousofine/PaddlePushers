import Matter from 'matter-js';
import { View } from 'react-native';

const Ball = (props) => {
  const width = props.size.width;
  const height = props.size.height;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        borderRadius: 20 / 2,
        backgroundColor: props.color,
      }}>
    </View>
  );
};

export default (world, color, pos, size, extraOptions) => {
  const TheBall = Matter.Bodies.circle(
    pos.x,
    pos.y,
    15,
    {
      label: extraOptions.label,
      frictionAir: 0,
      friction: 0,
      frictionStatic: 0,
      restitution: 1,
    }
  );

  Matter.World.add(world, TheBall);
  return {
    body: TheBall,
    color,
    pos,
    size,
    extraOptions,
    renderer: <Ball />,
  };
};
