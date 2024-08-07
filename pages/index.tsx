import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Book } from "@/types/book";
import { Button } from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";

// getServerSidePropsの返り値
type ServerProps = { books: Book[] };

// getServerSidePropsはサーバーサイドで実行される処理
// この関数で、api routesのエンドポイントを呼び出して、クライアントでpropsとしてレスポンスを扱えるようにする
// GetServerSideProps型に、ジェネリクス(型引数)でServerPropsを指定することで、propsの型を指定できる
// ジェネリクスは一旦そんなに理解しなくてもいいかも
export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  // どんなリクエストが来たか
  req,
}) => {
  const res = await fetch(`${getApiBaseUrl(req)}/books`).then((res) =>
    res.json()
  );
  return {
    props: { books: res.data },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home(props: Props) {
  // useRouterは、Next.jsのルーターを使うためのフック
  // これを使うことで、ページ遷移などの処理を簡単に実現できる
  const router = useRouter();
  // 削除されたときにtrueになるstate
  const [deleted, setDeleted] = useState<boolean>(false);

  // 本を追加ボタンをクリックしたときに呼び出すハンドラー
  // ハンドラーは、イベントが発生したときに実行する関数全般の呼称
  // NOTE:
  // ただし、単なる画面遷移の場合はハンドラーではなく < a > タグを使うべき
  // なぜなら、Cmd + クリックで別タブで開いたりすることができないし、
  // ブラウザにリンクとして認識されないのでアクセシビリティ的にも良くない
  // 一旦ここではハンドラで実現してしまう
  const handleClickNewButton = () => {
    // ルーターを使ってページ遷移する
    router.push("/new");
  };

  // どのbookを削除するのかわからないといけないので、idを引数に取る
  const handleClickDeleteButton = async (id: number) => {
    await fetch(`/api/books/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(() => {
      // 削除したら、deletedをtrueにする
      setDeleted(true);
      // asPathは現在のURLを取得する
      router.replace(router.asPath);
    });
  };

  return (
    <main className="py-4 px-8">
      {/* tailwindのclass名でstylingする
      tailwind.config.tsでtheming（テーマを作成すること）すればより使いやすくカスタマイズすることもできるが、
      何もしなくても十分柔軟なthemeが用意されている */}
      {/* 4xlとはxxxxlargeのことで、文字の大きさを指定している */}
      <h1 className="text-4xl font-bold">Book App</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">本の一覧</h2>
        {/* onClickハンドラにhandleClickNewButtonを渡して、
        ボタンがクリックされたときに関数が実行されるようにする */}
        <Button size="lg" onClick={handleClickNewButton}>
          本の追加
        </Button>
      </div>
      {/* それぞれのクラス名にマウスオーバーすれば、どんなcssがあたっているかを確認できるのでチェックすること */}
      {/* flex-wrap: wrap; は、flexboxのプロパティで、要素が折り返されるようにするもの */}
      <div className="p-8 flex flex-wrap gap-4">
        {/* deletedがtrueのときに要素が評価される（レンダリングされる） */}
        {/* 論理積は、左辺がtrueなら左辺、左辺がfalseなら右辺を評価する */}
        {deleted && (
          // 3秒立ったら消えるようにフェードイン・アウトする
          <div className="w-full bg-green-200 p-4 rounded-lg mb-4 ">
            削除しました
          </div>
        )}
        {props.books.map((book) => (
          <div
            key={book.id}
            // [320px]という書き方は、具体的なpx数を指定してspacingする方法で、1px単位で指定できる
            // 指定せず w-8 などと書くと、 8 * 4px = 32px となる（デフォルトのthemeの場合）
            // 大きい値の場合は面倒なので、320pxなどと指定することが多い
            // デバイスのサイズがlg以上のときは30%の幅を持つ
            className="lg:w-[30%] w-full border border-gray-600 rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-2">{book.title}</h3>
            <p className="mb-2">{book.summary}</p>
            <p>{book.created_at}</p>

            <div className="flex gap-4 justify-end">
              <a
                href={`/${book.id}/edit`}
                className="text-gray-700 underline hover:text-blue-700 cursor-pointer"
              >
                編集
              </a>
              <button
                // ハンドラーに引数ありの関数を渡すときは、アロー関数を使う
                // なぜならば、アロー関数を使わないと、関数が即時実行されてしまうため
                onClick={() => handleClickDeleteButton(book.id)}
                className="text-gray-700 hover:text-red-700 underline"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
