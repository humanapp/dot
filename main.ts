namespace dot {
    control.eventContext().registerFrameHandler(scene.UPDATE_CONTROLLER_PRIORITY, () => {
        input.update();
        _input_internal.input.update();
    });
    control.eventContext().registerFrameHandler(scene.UPDATE_PRIORITY, dot.game._internal.update);
    control.eventContext().registerFrameHandler(scene.RENDER_SPRITES_PRIORITY, dot.gfx._internal.update);
}
