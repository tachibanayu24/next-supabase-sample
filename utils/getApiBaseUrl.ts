import { GetServerSidePropsContext } from "next";

// reqから、どんなhostやprotocolでアクセスされているかを取得し、API RoutesのベースURLを返す
export const getApiBaseUrl = (
  // GetServerSidePropsContextというオブジェクトの型の req というkeyの型 という意味
  req: GetServerSidePropsContext["req"]
) => {
  // リクエストヘッダの中のhost
  // 存在しないときはlocalhostとみなす
  // デプロイされた環境ではその環境のURLになる
  const host = req.headers.host || "localhost:3000";
  // protocolはhttpかhttpsかを判定する
  // localhostのときはhttp、それ以外のときはhttps
  // /^localhost/ は、 localhost で始まる文字列を表す正規表現
  // .test は、正規表現にマッチするかどうかを判定するメソッド
  const protocol = /^localhost/.test(host) ? "http" : "https";

  // 必ず /api 以下に配置されるので、 /api をつけて返す
  return `${protocol}://${host}/api`;
};
