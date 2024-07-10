import Text from "@components/text";
import { getLostartNotice } from "@libs/data";

export default async function TestNews() {
  const { news, error } = await getLostartNotice();

  if (news === null)
    return (
      <p>
        <Text typography="regular">{error}</Text>
      </p>
    );

  return (
    <div>
      {news.map((item, index) => (
        <div key={index}>
          <h3>
            <Text typography="regular">{item.title}</Text>
          </h3>
        </div>
      ))}
    </div>
  );
}
