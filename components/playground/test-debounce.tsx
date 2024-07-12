"use client";

import Input from "@components/input";
import Text from "@components/text";
import { useDebouncedValue } from "@hooks/useDebouncedValue";
import { delay } from "@libs/delay";
import {
  ChangeEvent,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

const data: User[] = [
  {
    name: "김철수",
    age: 20,
  },
  {
    name: "이영희",
    age: 30,
  },
  {
    name: "박영수",
    age: 40,
  },
  {
    name: "최영미",
    age: 50,
  },
  {
    name: "정영훈",
    age: 60,
  },
];

async function getUsers(input: string) {
  if (!input || input === "") return [];
  await delay(500);
  return data.filter((item) => item.name.includes(input));
}

export default function TestDebounce() {
  return (
    <Layout>
      <Controller>
        {({ input, handleChangeInput, pending, debouncedInput, users }) => (
          <>
            <Input
              value={input}
              onChange={handleChangeInput}
              label="이름 입력"
              disabled={pending}
            />
            {debouncedInput.length > 0 ? (
              <Users users={users} />
            ) : (
              <p>
                <Text typography="medium">이름을 입력해주세요.</Text>
              </p>
            )}
          </>
        )}
      </Controller>
    </Layout>
  );
}

type ChildrenArgs = {
  input: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  pending: boolean;
  debouncedInput: string;
  users: User[];
};

type ControllerProps = {
  children: (args: ChildrenArgs) => ReactNode;
};

function Controller({ children }: ControllerProps) {
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  const debouncedInput = useDebouncedValue(input, 1000);
  useEffect(() => {
    (async () => {
      setPending(true);
      const data = await getUsers(debouncedInput);
      setUsers(data);
      setPending(false);
    })();
  }, [debouncedInput]);

  if (!children || typeof children !== "function") return null;
  return children({ input, handleChangeInput, pending, debouncedInput, users });
}

const Users = memo(function Users({ users }: { users: User[] }) {
  return users.length > 0 ? (
    <div>
      {users.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
          <div>{item.age}</div>
        </div>
      ))}
    </div>
  ) : (
    <p>
      <Text typography="medium">검색 결과가 없어요.</Text>
    </p>
  );
});

function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-[300px]">{children}</div>;
}

type User = {
  name: string;
  age: number;
};
