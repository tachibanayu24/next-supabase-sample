import { Button } from "@/components";
import { Book } from "@/types/book";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

type ServerProps = { book: Book };

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  // ここに、path parameterが入る
  // path parameterとは、URLの一部に含まれる変数のこと
  query,
  // どんなリクエストが来たか
  req,
}) => {
  // `[id].tsx`の`[id]`の部分が`query`に入る
  const id = query.id;

  // 何も指定しなかった場合、fetchはGETリクエストを送信する
  const res = await fetch(`${getApiBaseUrl(req)}/books/${id}`).then((res) =>
    res.json()
  );
  return {
    props: { book: res.data },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Edit({ book }: Props) {
  const router = useRouter();

  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const title = form.get("title");
    const summary = form.get("summary");
    const comment = form.get("comment");

    if (!title || !summary || !comment) {
      setHasError(true);
      return;
    }

    setHasError(false);

    await fetch(`/api/books/${router.query.id}`, {
      // PUTは、リソースを更新するためのメソッド
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        summary,
        comment,
      }),
    })
      // thenは、fetchが成功した場合に実行される
      .then(() => {
        // 成功したらトップページにリダイレクトする
        router.push("/");
      });
  };

  return (
    <main className="py-4 px-8">
      <h1 className="text-4xl font-bold">Book App</h1>
      <h2 className="text-2xl font-bold">本の編集</h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* htmlForは、htmlでいうところのfor属性
          jsでは、forは予約語なので、htmlForという名前になっている
          対応するinputのnameを入れることで、ラベルとinputを紐付けることができる */}
        <div className="py-4 w-1/2">
          <label htmlFor="title">タイトル</label>
          <input
            name="title"
            defaultValue={book.title}
            className="block border border-gray-600 rounded-md w-full p-2"
          />
        </div>

        <div className="py-4 w-1/2">
          <label htmlFor="summary">あらすじ</label>
          <textarea
            name="summary"
            defaultValue={book.summary}
            className="block border border-gray-600 rounded-md w-full h-40 p-2"
          />
        </div>

        <div className="py-4 w-1/2">
          <label htmlFor="comment">感想</label>
          <textarea
            name="comment"
            defaultValue={book.comment}
            className="block border border-gray-600 rounded-md w-full h-40 p-2"
          />
        </div>

        <Button size="md" type="submit">
          編集
        </Button>
        {hasError && (
          <p className="text-red-600 pt-2">すべての項目を入力してください</p>
        )}
      </form>
    </main>
  );
}
