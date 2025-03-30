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



    // ★紫色の四角形を作成します
    const purpleRect = new g.FilledRect({
      scene,
      cssColor: "purple",
      width: 100, height: 100,
      x: 50, y: 100,
      touchable: true,
    });
    // ★紫色の四角形をシーンに追加します
    scene.append(purpleRect);

    // ★紫色の四角形がクリックされた時のイベントを追加します
    purpleRect.onPointDown.add(e => {
      // ★紫色の四角形を右方向へ +10 だけ移動します
      purpleRect.x += 10;
      purpleRect.modified();
    });
  }
};
