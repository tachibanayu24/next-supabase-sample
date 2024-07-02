import { Button } from "@/components";
import { FormEvent, useState } from "react";

// 本を新規追加するページ
// Next.jsのページコンポーネントは、pagesディレクトリに配置することで、
// 自動的にルーティングされる
export default function New() {
  // formにエラーがあるかどうかを管理するstate
  // trueの場合はエラーあり
  const [hasError, setHasError] = useState<boolean>(false);

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

    // どれか一つでも空の場合はエラーにしてデータを送信せず終了
    if (!title || !summary || !comment) {
      setHasError(true);
      // それ以降の処理を実行したくないのでreturnする
      // ガード節または早期リターンと呼ばれる
      return;
    }

    setHasError(false);

    console.log({ title, summary, comment });

    // TODO: ここでサーバーに通信する
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
        {hasError && (
          <p className="text-red-600 pt-2">すべての項目を入力してください</p>
        )}
      </form>
    </main>
  );
}
