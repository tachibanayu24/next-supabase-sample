import { ButtonHTMLAttributes, ComponentProps } from "react";

// ButtonHTMLAttributes<HTMLButtonElement> は、 HTML要素のbuttonが受け付ける属性のすべてを意味する
// つまり、 onClick や name など、 単なるHTML要素の button にわたすことができる属性である
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  // 末尾に?をつけると、省略可能な引数になる（optionalという）
  // | で区切るのはユニオン型といい、 sm か md か lg のいずれかを受け付けることを意味する
  size?: "sm" | "md" | "lg";
};

export const Button = ({
  children,
  onClick,
  // size = 'md' はデフォルト値を表現している
  // 何も指定しなければ、md が適用される
  size = "md",
  disabled,
  // ...rest は、Propsで明示的に記載していない、残りすべてのpropsである
  // restという書き方にしないといけないわけではなく、最後に ... (スプレッド演算子) で書いてある値に残りすべてが入る
  // つまり、restの中身は、childrenとonClickを除いたButtonHTMLAttributes<HTMLButtonElement>の全てである
  ...rest
}: Props) => {
  // デフォルトの色のクラス名
  const color = "bg-blue-600 hover:bg-blue-700 active:bg-blue-500";
  // デフォルトの色のクラス名
  const disabledColor = "bg-gray-400";
  // 三項演算子
  // disabledがtrueの場合は、disabledColorを適用し、falseの場合はcolorを適用する
  const colorClassName = disabled ? disabledColor : color;

  return (
    // ...rest は、残りすべてのpropsを展開して渡している
    // いちいち書かなくても、このように書くことで、propsをbuttonに渡すことができる
    <button
      className={`${colorClassName} border-none text-white font-bold py-2 px-6 rounded-full transition-colors duration-100 ease-in-out shadow-md`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
