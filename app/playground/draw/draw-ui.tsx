"use client";

import Button from "@components/button";
import Input from "@components/input";
import Text from "@components/text";
import { signup, validateCharacter } from "@libs/actions";
import { delay } from "@libs/delay";
import { MainCharacter } from "@libs/types";
import clsx from "clsx";
import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function DrawUI() {
  return (
    <>
      <Controller>
        {({
          isShowInfo,
          validatedResult,
          onToggleInfo,
          onValidateCharacter,
          onSignup,
        }) => (
          <>
            <ValidityForm
              validatedResult={validatedResult}
              onValidateCharacter={onValidateCharacter}
              onSignup={onSignup}
            >
              <Inputs validatedResult={validatedResult} />
              <ApiKeyInfo isShowInfo={isShowInfo} onToggleInfo={onToggleInfo} />
              <ValidityButton validatedResult={validatedResult} />
              <SignupButton validatedResult={validatedResult} />
            </ValidityForm>
          </>
        )}
      </Controller>
    </>
  );
}

const initialFormState: FormState = {
  characterName: "",
  apiKey: "",
};

function Controller({ children }: ControllerProps) {
  const methods = useForm<FormState>({
    defaultValues: initialFormState,
  });
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [validatedResult, setValidatedResult] = useState<ValidatedResult>(null);

  const handleToggleInfo = useCallback(() => {
    setIsShowInfo((prev) => !prev);
  }, []);

  const { characterName, apiKey } = methods.watch();

  const handleValidateCharacter = useCallback(async () => {
    const result = await validateCharacter(characterName, apiKey);
    if (!!result) {
      setValidatedResult(result);
    } else {
      alert("입력한 정보를 다시 확인해주세요.");
    }
  }, [characterName, apiKey]);

  const handleSignup = useCallback(async () => {
    console.log("sign up");
    if (!validatedResult) {
      return;
    }
    await signup(
      apiKey,
      validatedResult.mainCharacter,
      validatedResult.characters,
    );
  }, [apiKey, validatedResult]);

  if (!children || typeof children !== "function") {
    return null;
  }

  return (
    <FormProvider {...methods}>
      {children({
        isShowInfo,
        validatedResult,
        onToggleInfo: handleToggleInfo,
        onValidateCharacter: handleValidateCharacter,
        onSignup: handleSignup,
      })}
    </FormProvider>
  );
}

const Inputs = memo(function Inputs({
  validatedResult,
}: {
  validatedResult: ValidatedResult;
}) {
  const { register } = useFormContext<FormState>();
  const { pending } = useFormStatus();
  const isDisabled = useMemo(
    () => pending || !!validatedResult,
    [pending, validatedResult],
  );
  return (
    <>
      <Input
        label="캐릭터 이름"
        placeholder="주 캐릭터 이름을 정확히 입력해주세요."
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...register("characterName")}
      />
      <Input
        label="API 키"
        placeholder="API 키를 붙여넣기하세요."
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...register("apiKey")}
      />
    </>
  );
});

const ApiKeyInfo = memo(function ApiKeyInfo({
  isShowInfo,
  onToggleInfo,
}: {
  isShowInfo: boolean;
  onToggleInfo: () => void;
}) {
  return (
    <div className={clsx("mb-[16px] flex flex-col gap-[4px]")}>
      <h3 onClick={() => onToggleInfo()}>
        <Text
          style={{
            cursor: "pointer",
          }}
          typography="regular"
        >
          API 키는 어떻게 발급받나요?
        </Text>
      </h3>
      {isShowInfo && (
        <ul className={clsx("ml-[16px] list-decimal")}>
          <li>
            <a
              href="https://developer-lostark.game.onstove.com/"
              target="_blank"
            >
              <Text
                typography="meta"
                style={{
                  textDecoration: "underline",
                }}
              >
                키 발급하러 가기
              </Text>
            </a>
          </li>
          <li>
            <Text typography="meta">로스트아크 계정으로 로그인</Text>
          </li>
          <li>
            <Text typography="meta">
              상단 <code>GET ACCESS TO LOSTARK API</code> 버튼 클릭
            </Text>
          </li>
          <li>
            <Text typography="meta">API 발급 후 복사하여 사용</Text>
          </li>
        </ul>
      )}
    </div>
  );
});

const ValidityForm = function ({
  children,
  validatedResult,
  onValidateCharacter,
  onSignup,
}: {
  children: ReactNode;
  validatedResult: ValidatedResult;
  onValidateCharacter: () => void;
  onSignup: () => void;
}) {
  const action = validatedResult ? onSignup : onValidateCharacter;
  return (
    <form action={action} className={clsx("mb-[8px]")}>
      {children}
    </form>
  );
};

const ValidityButton = memo(function ValidityButton({
  validatedResult,
}: {
  validatedResult: ValidatedResult;
}) {
  const { pending } = useFormStatus();
  const isDisabled = useMemo(
    () => pending || !!validatedResult,
    [pending, validatedResult],
  );
  return (
    <Button
      type="submit"
      buttonType="alert"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      style={{ marginBottom: "8px" }}
    >
      유효성 확인
    </Button>
  );
});

const SignupButton = memo(function SignupButton({
  validatedResult,
}: {
  validatedResult: ValidatedResult;
}) {
  const { pending } = useFormStatus();
  const isDisabled = useMemo(
    () => pending || !validatedResult,
    [pending, validatedResult],
  );
  return (
    <Button disabled={isDisabled} aria-disabled={isDisabled}>
      회원가입
    </Button>
  );
});

type ValidatedResult = {
  characters: string[];
  mainCharacter: MainCharacter;
} | null;

type FormState = {
  characterName: string;
  apiKey: string;
};

type ChildrenArgs = {
  isShowInfo: boolean;
  validatedResult: ValidatedResult | null;
  onToggleInfo: () => void;
  onValidateCharacter: () => void;
  onSignup: () => void;
};

type ControllerProps = {
  children: (args: ChildrenArgs) => ReactNode;
};
