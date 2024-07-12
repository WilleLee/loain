import Header from "@components/header";
import Text from "@components/text";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <>
      <Header />
      <h2>
        <Text typography="semibold">home page</Text>
      </h2>
    </>
  );
}
