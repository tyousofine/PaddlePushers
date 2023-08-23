import ball from '../components/ball';
import boundary from '../components/boundary';
import player from '../components/player';
import enemy from '../components/enemy';
import Matter from 'matter-js';
import Constants from '../Constants';

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  engine.constraintIterations = 10;
  engine.positionIterations = 10;
  engine.velocityIterations = 10;

  let world = engine.world;

  engine.gravity.x = 0;
  engine.gravity.y = 0;

  return {
    physics: { engine, world },
    TheBall: ball(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 3 },
      { height: 20, width: 20 },
      { label: 'TheBall', }
    ),

    ThePlayer: player(
      world,
      'red',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 1.04 },
      { width: 80, height: 20 },
      { label: 'Player', }
    ),

    TheEnemy: enemy(
      world,
      'red',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 24 },
      { width: 80, height: 20 },
      {
        label: 'Enemy',
        isStatic: true,
      }
    ),

    LeftBoundary: boundary(
      world,
      'white',
      { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 10 },
      { label: 'LeftBoundary' }
    ),

    RightBoundary: boundary(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 10 },
      { label: 'RightBoundary', }
    ),

    TopBoundary: boundary(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH / 2, y: 0 },
      { height: 5, width: Constants.WINDOW_WIDTH },
      { label: 'TopBoundary', }
    ),

    BottomBoundary: boundary(
      world,
      'white',
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: 5, width: Constants.WINDOW_WIDTH },
      { label: 'BottomBoundary', }
    ),
  };
};
