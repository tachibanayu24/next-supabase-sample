import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

// /api/books エンドポイント
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/books にリクエストが送信されたとき、booksテーブルのすべてのデータを返す
  if (req.method === "GET") {
    // 実際に発行されるクエリは、
    // SELECT * FROM books ORDER BY created_at ASC
    const data = await supabase
      .from("books")
      .select("*")
      // 作成日時の昇順で取得する
      .order("created_at", { ascending: true });
    // 200 OKは、リクエストが成功したことを示すステータスコード
    res.status(200).json(data);
  }
  // POST /api/books にリクエストが送信されたとき、booksテーブルにデータを追加する
  else if (req.method === "POST") {
    const { title, summary, comment } = req.body;

    // こういうサーバー側のバリデーションをやるとなお良い
    if (!title || !summary || !comment) {
      // 400 Bad Requestは、リクエストが不正であることを示すステータスコード
      return res.status(400).end("タイトル, あらすじ, 感想は必須です");
    }

    // booksテーブルに、データをインサートする
    await supabase.from("books").insert([
      {
        title,
        summary,
        comment,
      },
    ]);

    // 201 Createdは、リクエストが成功してリソースが作成されたことを示すステータスコード
    res.status(201).end();
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
