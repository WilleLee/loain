import Button from "@components/button";
import Header from "@components/header";
import Input from "@components/input";
import Characters from "@components/playground/characters";
import News from "@components/playground/news";
import DateInputLoader from "@components/playground/test-date-input";
import TestForm from "@components/test-form";
import Text from "@components/text";
import Textarea from "@components/textarea";
import clsx from "clsx";
import { Suspense } from "react";

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <div
        className={clsx(
          "rounded-[10px] border-[2px] border-solid border-grey-600 p-[8px] dark:border-grey-300",
        )}
      >
        <h2>
          <Text typography="bold">form action test</Text>
        </h2>
        <Suspense fallback={<p>loading...</p>}>
          <TestForm />
        </Suspense>
      </div>
      <div>
        <h2>
          <Text typography="bold">texts</Text>
        </h2>
        <div className={clsx("flex items-end gap-[8px]")}>
          <Text typography="bold">bold</Text>
          <Text typography="semibold">semibold</Text>
          <Text typography="medium">medium</Text>
          <Text typography="regular">regular</Text>
          <Text typography="light">light</Text>
          <Text typography="meta">meta</Text>
        </div>
      </div>
      <div>
        <h2>
          <Text typography="bold">colors</Text>
        </h2>
        <div className={clsx("grid grid-rows-[repeat(9,24px)] gap-[8px]")}>
          <div className={clsx("grid grid-cols-[repeat(10,24px)] gap-[8px]")}>
            <div className={clsx("bg-grey-50")} />
            <div className={clsx("bg-grey-100")} />
            <div className={clsx("bg-grey-200")} />
            <div className={clsx("bg-grey-300")} />
            <div className={clsx("bg-grey-400")} />
            <div className={clsx("bg-grey-500")} />
            <div className={clsx("bg-grey-600")} />
            <div className={clsx("bg-grey-700")} />
            <div className={clsx("bg-grey-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-inverseGrey-50")} />
            <div className={clsx("bg-inverseGrey-100")} />
            <div className={clsx("bg-inverseGrey-200")} />
            <div className={clsx("bg-inverseGrey-300")} />
            <div className={clsx("bg-inverseGrey-400")} />
            <div className={clsx("bg-inverseGrey-500")} />
            <div className={clsx("bg-inverseGrey-600")} />
            <div className={clsx("bg-inverseGrey-700")} />
            <div className={clsx("bg-inverseGrey-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-blue-50")} />
            <div className={clsx("bg-blue-100")} />
            <div className={clsx("bg-blue-200")} />
            <div className={clsx("bg-blue-300")} />
            <div className={clsx("bg-blue-400")} />
            <div className={clsx("bg-blue-500")} />
            <div className={clsx("bg-blue-600")} />
            <div className={clsx("bg-blue-700")} />
            <div className={clsx("bg-blue-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-red-50")} />
            <div className={clsx("bg-red-100")} />
            <div className={clsx("bg-red-200")} />
            <div className={clsx("bg-red-300")} />
            <div className={clsx("bg-red-400")} />
            <div className={clsx("bg-red-500")} />
            <div className={clsx("bg-red-600")} />
            <div className={clsx("bg-red-700")} />
            <div className={clsx("bg-red-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-orange-50")} />
            <div className={clsx("bg-orange-100")} />
            <div className={clsx("bg-orange-200")} />
            <div className={clsx("bg-orange-300")} />
            <div className={clsx("bg-orange-400")} />
            <div className={clsx("bg-orange-500")} />
            <div className={clsx("bg-orange-600")} />
            <div className={clsx("bg-orange-700")} />
            <div className={clsx("bg-orange-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-yellow-50")} />
            <div className={clsx("bg-yellow-100")} />
            <div className={clsx("bg-yellow-200")} />
            <div className={clsx("bg-yellow-300")} />
            <div className={clsx("bg-yellow-400")} />
            <div className={clsx("bg-yellow-500")} />
            <div className={clsx("bg-yellow-600")} />
            <div className={clsx("bg-yellow-700")} />
            <div className={clsx("bg-yellow-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-purple-50")} />
            <div className={clsx("bg-purple-100")} />
            <div className={clsx("bg-purple-200")} />
            <div className={clsx("bg-purple-300")} />
            <div className={clsx("bg-purple-400")} />
            <div className={clsx("bg-purple-500")} />
            <div className={clsx("bg-purple-600")} />
            <div className={clsx("bg-purple-700")} />
            <div className={clsx("bg-purple-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-teal-50")} />
            <div className={clsx("bg-teal-100")} />
            <div className={clsx("bg-teal-200")} />
            <div className={clsx("bg-teal-300")} />
            <div className={clsx("bg-teal-400")} />
            <div className={clsx("bg-teal-500")} />
            <div className={clsx("bg-teal-600")} />
            <div className={clsx("bg-teal-700")} />
            <div className={clsx("bg-teal-800")} />
          </div>
          <div className={clsx("grid grid-cols-[repeat(9,24px)] gap-[8px]")}>
            <div className={clsx("bg-green-50")} />
            <div className={clsx("bg-green-100")} />
            <div className={clsx("bg-green-200")} />
            <div className={clsx("bg-green-300")} />
            <div className={clsx("bg-green-400")} />
            <div className={clsx("bg-green-500")} />
            <div className={clsx("bg-green-600")} />
            <div className={clsx("bg-green-700")} />
            <div className={clsx("bg-green-800")} />
          </div>
        </div>
      </div>
      <div>
        <h2>
          <Text typography="bold">inputs</Text>
        </h2>
        <div className="w-[240px]">
          <Input label="이름" placeholder="이름을 입력해주세요." />
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            error="비밀번호를 잘 입력해주세요."
          />
          <DateInputLoader />
          <Textarea label="textarea" placeholder="textarea" />
          <Textarea label="textarea" placeholder="textarea" error="에러" />
        </div>
      </div>
      <div>
        <h2>
          <Text typography="bold">buttons</Text>
        </h2>
        <div className="w-[240px]">
          <Button>로그인</Button>
          <Button buttonType="secondary">로그인</Button>
          <Button buttonType="alert">로그인</Button>
          <Button disabled>로그인</Button>
          <Button fullWidth={false}>로그인</Button>
        </div>
        <Suspense fallback={<div>loading...</div>}>
          <Characters />
        </Suspense>
        <Suspense fallback={<div>loading...</div>}>
          <News />
        </Suspense>
      </div>
    </>
  );
}
