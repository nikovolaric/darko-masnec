function CollabListItem({
  exhibition,
}: {
  exhibition: {
    duration: string;
    exhibitionName: string;
    role?: string;
    location: string;
    _id: string;
  };
}) {
  const { duration, exhibitionName, role, location } = exhibition;

  return (
    <p className="lg:text-xl">
      {duration} -{" "}
      <span className="font-semibold text-secondary">{exhibitionName}</span> -{" "}
      {role}, {location}
    </p>
  );
}

export default CollabListItem;
