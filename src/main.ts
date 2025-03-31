export = main;

function main(gameMainParam: g.GameMainParameterObject): void {
  const scene = new g.Scene({ game: g.game });
  scene.onLoad.add(loaded);
  g.game.pushScene(scene);

  function loaded(scene: g.Scene) {
    // ★青色の四角形を作成します
    const blueRect = new g.FilledRect({
      scene,
      cssColor: "red",
      width: 50, height: 50,
    });
    // ★青色の四角形をシーンに追加します
    scene.append(blueRect);
  }
};
