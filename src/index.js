import { box2d, initBox2D } from "./init-box2d.js";
import * as PIXI from "pixi.js";
import DebugDrawer from "./debug-drawer.js";

async function init() {
    const renderer = PIXI.autoDetectRenderer(300, 300, {
        backgroundColor: 0x000000,
        antialias: true,
        resolution: 1
    });
    renderer.view.width = 300;
    renderer.view.height = 300;
    document.body.appendChild(renderer.view);

    const stage = new PIXI.Container();

    await initBox2D();
    const {
        b2_dynamicBody,
        b2BodyDef,
        b2CircleShape,
        b2PolygonShape,
        b2Vec2,
        b2World
    } = box2d;

    const world = new b2World();
    const gravity = new b2Vec2(0, 9.8);
    world.SetGravity(gravity);
    const pixelsPerMeter = 30;

    const debugDrawer = new DebugDrawer(stage, pixelsPerMeter);
    world.SetDebugDraw(debugDrawer.instance);

    // Ground
    const groundBodyDef = new b2BodyDef();
    groundBodyDef.set_position(new b2Vec2(150 / pixelsPerMeter,
        270 / pixelsPerMeter));
    const groundBody = world.CreateBody(groundBodyDef);
    const groundShape = new b2PolygonShape();
    groundShape.SetAsBox(130 / pixelsPerMeter, 20 / pixelsPerMeter);
    groundBody.CreateFixture(groundShape, 0);

    // Box
    const boxBodyDef = new b2BodyDef();
    boxBodyDef.set_position(new b2Vec2(100 / pixelsPerMeter,
        30 / pixelsPerMeter));
    boxBodyDef.angle = 30 * Math.PI / 180;
    boxBodyDef.type = b2_dynamicBody;
    const boxBody = world.CreateBody(boxBodyDef);
    const boxShape = new b2PolygonShape();
    boxShape.SetAsBox(30 / pixelsPerMeter, 30 / pixelsPerMeter);
    boxBody.CreateFixture(boxShape, 1);

    // Circle
    const circleBodyDef = new b2BodyDef();
    circleBodyDef.type = b2_dynamicBody;
    circleBodyDef.position = new b2Vec2(200 / pixelsPerMeter,
        50 / pixelsPerMeter);
    const circleRigidBody = world.CreateBody(circleBodyDef);
    const circleShape = new b2CircleShape();
    circleShape.m_radius = 20 / pixelsPerMeter;
    const circleFixture = circleRigidBody.CreateFixture(circleShape, 1);
    circleFixture.SetRestitution(0.5);

    // Platform
    const platformBodyDef = new b2BodyDef();
    platformBodyDef.set_position(new b2Vec2(220 / pixelsPerMeter,
        200 / pixelsPerMeter));
    platformBodyDef.angle = -20 * Math.PI / 180;
    const platformBody = world.CreateBody(platformBodyDef);
    const platformShape = new b2PolygonShape();
    platformShape.SetAsBox(50 / pixelsPerMeter, 5 / pixelsPerMeter);
    platformBody.CreateFixture(platformShape, 0);

    let currentTime, lastTime, dt;

    function render() {
        requestAnimationFrame(render);

        currentTime = Date.now();
        dt = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        world.Step(dt, 3, 2);
        world.DebugDraw();

        // Render the stage
        renderer.render(stage);
        debugDrawer.clear();
    }

    lastTime = Date.now();
    render();
}

init();
