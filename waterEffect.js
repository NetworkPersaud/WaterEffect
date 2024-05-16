const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

app.loader
    .add('displacement', 'https://pixijs.io/examples/examples/assets/displacement_map_repeat.jpg')
    .add('background', 'https://pixijs.io/examples/examples/assets/water.jpg')
    .load(setup);

function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.background.texture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

    const displacementSprite = new PIXI.Sprite(resources.displacement.texture);
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementSprite.scale.set(2);
    app.stage.addChild(displacementSprite);

    background.filters = [displacementFilter];

    app.stage.interactive = true;
    app.stage.on('mousemove', onPointerMove);

    function onPointerMove(event) {
        displacementSprite.position.set(event.data.global.x - displacementSprite.width / 2, event.data.global.y - displacementSprite.height / 2);
    }

    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        background.width = app.screen.width;
        background.height = app.screen.height;
    });
}
