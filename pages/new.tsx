import { Button } from "@/components";
import { FormEvent } from "react";

// 本を新規追加するページ
// Next.jsのページコンポーネントは、pagesディレクトリに配置することで、
// 自動的にルーティングされる
export default function New() {
  // formをsubmitしたときのハンドラー
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // デフォルトの挙動をキャンセル
    // submit eventの場合は、ページがリロードされるのを防ぐ
    e.preventDefault();
    // FormDataインスタンスを生成して、form要素から値を取得する
    const form = new FormData(e.target as HTMLFormElement);
    const title = form.get("title");
    const summary = form.get("summary");
    const comment = form.get("comment");

    console.log({ title, summary, comment });
  };

  return (
    <main className="py-4 px-8">
      <h1 className="text-4xl font-bold">Book App</h1>
      <h2 className="text-2xl font-bold">本の追加</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input name="title" className="border border-gray-600 rounded-md" />
          <textarea
            name="summary"
            className="border border-gray-600 rounded-md"
          />
          <textarea
            name="comment"
            className="border border-gray-600 rounded-md"
          />
          <Button size="md" type="submit">
            保存
          </Button>
        </form>
      </div>
    </main>
  );
}
