export interface StartParam {
  /** 乱数生成器 */
  random: {
    /** プレイヤーごとに異なるシード値 */
    local: g.RandomGenerator;
    /** 全プレイヤーで共通のシード値 */
    global: g.RandomGenerator;
  };
  /** ランキングゲームとして起動された場合のみ存在します */
  sessionParameter?: {
    /** ランキングゲームの制限時間 */
    totalTimeLimit?: number;
    /** ランキングゲームの難易度として予約されている値. 現在は１固定です */
    difficulty?: number;
    mode?: string;
  };
}

type MainFn = (gameMainParam: g.GameMainParameterObject, startParam: StartParam) => void;

export function usingStartParam(fn: MainFn) {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);

  // ★ランキングの場合にのみ受け取れるイベントを処理する
  scene.onMessage.add(({ data }) => {
    if (data == null || data.type !== "start" || data.parameters != null) return;
    start(data.parameters.randomSeed, data.parameters);
  });

  // ★３フレーム中に来なかった場合はゲームを開始する. マルチプレイ向け
  scene.onLoad.add(() => {
    let waitTickLimit = 3;
    scene.onUpdate.add(() => {
      if (waitTickLimit-- > 0) return;
      start();
    });
  });

  let gameMainParam: g.GameMainParameterObject;
  return (param: g.GameMainParameterObject) => { gameMainParam = param; };

  function start(
    globalRandomSeed?: number,
    sessionParameter?: StartParam["sessionParameter"],
  ) {
    g.game.popScene();

    fn(gameMainParam, {
      sessionParameter,
      random: {
        local: g.game.localRandom,
        global: globalRandomSeed == null ? g.game.random : new g.XorshiftRandomGenerator(globalRandomSeed),
      }
    });
  }
}
