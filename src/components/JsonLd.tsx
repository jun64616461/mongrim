export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // JSON.stringify 결과만 삽입 (사용자 입력 없음)
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
