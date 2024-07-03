import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

// /api/books/id エンドポイント
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/books にリクエストが送信されたとき、booksテーブルのすべてのデータを返す
  if (req.method === "GET") {
    const supabaseRes = await supabase
      .from("books")
      .select("*")
      // eqはequalの略で、指定したカラムの値が指定した値と等しい行を取得する
      // ここで実際に実行されるSQLは、SELECT * FROM books WHERE id = req.query.id
      .eq("id", req.query.id);

    // supabaseは、idがユニークかどうかわからないので、ただ一つ見つかった場合も配列で返ってくる
    // そのため、dataが配列だったときは、その中身を取り出して返す
    // そうでない場合は、見つからなかったとして404 Not Foundを返す
    // Array.isArrayは、引数が配列のときtrue
    if (Array.isArray(supabaseRes.data)) {
      res.status(200).json({ data: supabaseRes.data[0] });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
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
