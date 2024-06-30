import { createClient } from "@supabase/supabase-js";

// envとは環境変数
// 環境変数とは、プログラムが実行される環境によって変わる値のことであり、通常commitさせたくない値を格納するために使われる

// typescriptは、特に何も設定しなければenvの中身に何が入っているかがわからないため、 string か undefined が入っているかしかこの時点ではわからない
// しかし、createClientには、stringの値しか入らない
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// この時点では、supabaseUrlやsupabaseKeyは、stringかundefinedのどちらかであると、typescriptは推論している
// しかし、stringとして扱いたい
// なので、undefinedである可能性を除外したい
// as stringと型アサーションすることもできるが、型アサーションは通常望ましいアプローチではない
// typescriptの推論を強制的に指定するため、型安全性が失われる可能性がある

// なので、このように、もし想定外の値が入っていた場合はエラーを投げるようにするとgood
// すると、if文の外では、賢いtypescriptが、stringであると推論してくれる
if (supabaseUrl === undefined || supabaseKey === undefined) {
  // ちなみに、この中では、supabaseUrlはstring | undefinedであると推論される
  // e.g. console.log(supabaseUrl);

  throw new Error("Missing env variables");
}

// ↑のエラーのif文によるガード節のおかげで、stringとして推論される
export const supabase = createClient(supabaseUrl, supabaseKey);
