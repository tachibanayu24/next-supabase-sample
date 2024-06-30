import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

// /api/books エンドポイント
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/books にリクエストが送信されたとき、booksテーブルのすべてのデータを返す
  if (req.method === "GET") {
    const data = await supabase.from("books").select("*");
    // 200 OKは、リクエストが成功したことを示すステータスコード
    //{ data } は { data: data } の省略形
    res.status(200).json({ data });
  }
  // 未定義のメソッドにリクエストが送信されたとき、405 Method Not Allowedを返す
  // GET -> データ取得
  // POST -> データ作成
  // PUT -> データ更新
  // DELETE -> データ削除
  else {
    res.setHeader("Allow", ["GET"]);
    // 405 Method Not Allowedは、リクエストされたメソッドが許可されていないことを示すステータスコード
    // 丁寧にやるとこういう感じで書くことになる
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
