export default function InfoCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card stack">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
