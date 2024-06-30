import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { GetServerSideProps } from "next";

// getServerSidePropsの返り値
type ServerProps = {
  name: string;
};

// getServerSidePropsはサーバーサイドで実行される処理
// この関数で、api routesのエンドポイントを呼び出して、クライアントでpropsとしてレスポンスを扱えるようにする
// GetServerSideProps型に、ジェネリクス(型引数)でServerPropsを指定することで、propsの型を指定できる
// ジェネリクスは一旦そんなに理解しなくてもいいかも
export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  // どんなリクエストが来たか
  req,
}) => {
  const data = await fetch(`${getApiBaseUrl(req)}/hello`).then((data) =>
    data.json()
  );
  return {
    props: data,
  };
};

type Props = ServerProps;

// デバッグ用のコードを配置していいページです
export default function Debug(props: Props) {
  return (
    <div>
      <h1>This is debug page</h1>
      {/*
          await しなくても最初からAPIのレスポンスがとれているのは、Next.jsがSSRのフレームワークだから
          すでにサーバーサイドでAPI通信を済ませているので、クライアント側は待機しなくても最初からAPIのレスポンスを
          利用することができる
      */}
      <span>My name is {props.name}</span>
    </div>
  );
}
