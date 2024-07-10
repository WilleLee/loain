import Header from "@components/header";
import Text from "@components/text";
import { fetcher } from "@libs/fetcher";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data } = await fetcher("GET", "/", {
    headers: {
      Authorization: "Bearer token",
    },
  });
  console.log(data);
  return (
    <>
      <Header />
      <h2>
        <Text typography="semibold">home page</Text>
      </h2>
    </>
  );
}
