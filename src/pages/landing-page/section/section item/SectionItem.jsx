export default function SectionItem({ title, description }) {
  return (
    <div className="mt-4 mt-md-0 card p-3 w-25">
      <div className="title text-primary w-50" style={{ fontSize: "20px" }}>
        {title}
      </div>
      <div className="title text-dark my-2 font-weight-light">
        {description}
      </div>
    </div>
  );
}
