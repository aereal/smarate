interface FighterName {
  ja: string
}

export interface Fighter {
  name: FighterName
  id: number
}

export const fighters: ReadonlyArray<Fighter> = [
  { id: 1, name: { ja: "マリオ" } },
  { id: 2, name: { ja: "ドンキーコング" } },
  { id: 3, name: { ja: "リンク" } },
  { id: 4, name: { ja: "サムス" } },
  { id: 5, name: { ja: "ヨッシー" } },
  { id: 6, name: { ja: "カービィ" } },
  { id: 7, name: { ja: "フォックス" } },
  { id: 8, name: { ja: "ピカチュウ" } },
  { id: 9, name: { ja: "ルイージ" } },
  { id: 10, name: { ja: "ネス" } },
  { id: 11, name: { ja: "キャプテン・ファルコン" } },
  { id: 12, name: { ja: "プリン" } },
  { id: 13, name: { ja: "ピーチ" } },
  { id: 14, name: { ja: "クッパ" } },
  { id: 15, name: { ja: "アイスクライマー" } },
  { id: 16, name: { ja: "シーク" } },
  { id: 17, name: { ja: "ゼルダ" } },
  { id: 18, name: { ja: "ドクターマリオ" } },
  { id: 19, name: { ja: "ピチュー" } },
  { id: 20, name: { ja: "ファルコ" } },
  { id: 21, name: { ja: "マルス" } },
  { id: 22, name: { ja: "こどもリンク" } },
  { id: 23, name: { ja: "ガノンドロフ" } },
  { id: 24, name: { ja: "ミュウツー" } },
  { id: 25, name: { ja: "ロイ" } },
  { id: 26, name: { ja: "Mr.ゲーム&ウォッチ" } },
  { id: 27, name: { ja: "メタナイト" } },
  { id: 28, name: { ja: "ピット" } },
  { id: 29, name: { ja: "ゼロスーツサムス" } },
  { id: 30, name: { ja: "ワリオ" } },
  { id: 31, name: { ja: "スネーク" } },
  { id: 32, name: { ja: "アイク" } },
  { id: 33, name: { ja: "ポケモントレーナー" } },
  { id: 34, name: { ja: "ディディーコング" } },
  { id: 35, name: { ja: "リュカ" } },
  { id: 36, name: { ja: "ソニック" } },
  { id: 37, name: { ja: "デデデ" } },
  { id: 38, name: { ja: "ピクミン&オリマー" } },
  { id: 39, name: { ja: "ルカリオ" } },
  { id: 40, name: { ja: "ロボット" } },
  { id: 41, name: { ja: "トゥーンリンク" } },
  { id: 42, name: { ja: "ウルフ" } },
  { id: 43, name: { ja: "むらびと" } },
  { id: 44, name: { ja: "ロックマン" } },
  { id: 45, name: { ja: "Wii Fit トレーナー" } },
  { id: 46, name: { ja: "ロゼッタ&チコ" } },
  { id: 47, name: { ja: "リトル・マック" } },
  { id: 48, name: { ja: "ゲッコウガ" } },
  { id: 49, name: { ja: "Miiファイター格闘" } },
  { id: 50, name: { ja: "Miiファイター剣術" } },
  { id: 51, name: { ja: "Miiファイター射撃" } },
  { id: 52, name: { ja: "パルテナ" } },
  { id: 53, name: { ja: "パックマン" } },
  { id: 54, name: { ja: "ルキナ" } },
  { id: 55, name: { ja: "ルフレ" } },
  { id: 56, name: { ja: "シュルク" } },
  { id: 57, name: { ja: "ブラックピット" } },
  { id: 58, name: { ja: "クッパJr." } },
  { id: 59, name: { ja: "ダックハント" } },
  { id: 60, name: { ja: "リュウ" } },
  { id: 61, name: { ja: "クラウド" } },
  { id: 62, name: { ja: "カムイ" } },
  { id: 63, name: { ja: "ベヨネッタ" } },
  { id: 64, name: { ja: "インクリング" } },
  { id: 65, name: { ja: "デイジー" } },
  { id: 66, name: { ja: "リドリー" } },
  { id: 67, name: { ja: "シモン" } },
  { id: 68, name: { ja: "リヒター" } },
  { id: 69, name: { ja: "クロム" } },
  { id: 70, name: { ja: "ダークサムス" } },
  { id: 71, name: { ja: "キングクルール" } },
  { id: 72, name: { ja: "しずえ" } },
  { id: 73, name: { ja: "ケン" } },
  { id: 74, name: { ja: "ガオガエン" } },
  { id: 75, name: { ja: "パックンフラワー" } },
  { id: 76, name: { ja: "ジョーカー" } },
]

const fightersByID = fighters.reduce<Record<number, Fighter>>((a, f) => {
  return { ...a, [f.id]: f }
}, {})

export const findFighterByID = (id: number): Fighter | undefined =>
  fightersByID[id]
