import Matter from 'matter-js';
import Constants from './Constants';

let ballServed = false;


const Physics = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.physics.engine;

  Matter.Engine.update(engine, 1000 / 60);

  touches
    .filter((t) => t.type === 'end')
    .forEach((t) => {
      if (!ballServed) {
        
      Matter.Body.setVelocity(entities.TheBall.body, {
        x: Math.floor(Math.random() * 7) - 3 * (Math.random() < 0.5 ? -1 : 1),
        y: Math.floor(Math.random() * 7 + 3) * (Math.random() < 0.5 ? -1 : 1),
      });
      ballServed = true;
      }
    })
    
  
  //player score
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label === 'TheBall' && bodyB.label === 'Player') {
        dispatch({ type: 'player-score' });

        Matter.Body.setVelocity(entities.TheBall.body, {
          x: Math.floor(Math.random() * 2) * 2 - 3,
          // y: Math.floor(Math.random() * 4) - 8,
          y: 8,
        });
      }
    }
  });

  //Enemy Score
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label === 'TheBall' && bodyB.label === 'Enemy') {
        dispatch({ type: 'enemy-score' });
      }
    }
  });

    // Move the paddles based on touch input
  touches
    .filter((t) => t.type === 'move')
    .forEach((t) => {
      if (t.event.pageY < Constants.WINDOW_HEIGHT / 2) {
        Matter.Body.setPosition(entities.TheEnemy.body, {
          x: t.event.pageX,
          y: entities.TheEnemy.body.position.y,
        });
      } else {
        Matter.Body.setPosition(entities.ThePlayer.body, {
          x: t.event.pageX,
          y: entities.ThePlayer.body.position.y,
        });
      }
    });

 

  //GAME OVER
  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if ((bodyA.label === 'TheBall' && bodyB.label === 'BottomBoundary') || 
      (bodyA.label === 'TheBall' && bodyB.label === 'TopBoundary')) {
        dispatch({ type: 'game_over' });

        Matter.Body.setPosition(entities.TheBall.body, {
          x: Constants.WINDOW_WIDTH / 2,
          y: Constants.WINDOW_HEIGHT / 3,
        });
        Matter.Body.setVelocity(entities.TheBall.body, {
          x: 0,
          y: 0,
        });
        Matter.Body.setPosition(entities.ThePlayer.body, {
          x: Constants.WINDOW_WIDTH / 2,
          y: Constants.WINDOW_HEIGHT / 1.1,
        });
        Matter.Body.setPosition(entities.TheEnemy.body, {
          x: Constants.WINDOW_WIDTH / 2,
          y: Constants.WINDOW_HEIGHT / 24,
        });
        
        ballServed = false;
      }
    }
  });

  return entities;
};
export default Physics;
