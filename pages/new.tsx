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

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* htmlForは、htmlでいうところのfor属性
          jsでは、forは予約語なので、htmlForという名前になっている
          対応するinputのnameを入れることで、ラベルとinputを紐付けることができる */}
        <div className="py-4 w-1/2">
          <label htmlFor="title">タイトル</label>
          <input
            name="title"
            className="block border border-gray-600 rounded-md w-full p-2"
          />
        </div>

        <div className="py-4 w-1/2">
          <label htmlFor="summary">あらすじ</label>
          <textarea
            name="summary"
            className="block border border-gray-600 rounded-md w-full h-40 p-2"
          />
        </div>

        <div className="py-4 w-1/2">
          <label htmlFor="comment">感想</label>
          <textarea
            name="comment"
            className="block border border-gray-600 rounded-md w-full h-40 p-2"
          />
        </div>

        <Button size="md" type="submit">
          保存
        </Button>
      </form>
    </main>
  );
}
