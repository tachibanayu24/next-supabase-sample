import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Book } from "@/types/book";

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
  console.log(props.books);
  return (
    <main>
      <h1>Book App</h1>
    </main>
  );
}
