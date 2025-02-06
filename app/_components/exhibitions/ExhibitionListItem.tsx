function ExhibitionListItem({
  exhibition,
}: {
  exhibition: {
    duration: string;
    exhibitionName: string;
    groupSolo?: string;
    location: string;
    _id: string;
  };
}) {
  const { duration, exhibitionName, groupSolo, location } = exhibition;

  return (
    <p className="lg:text-xl">
      {duration} -{" "}
      <span className="font-semibold text-secondary">{exhibitionName}</span> -{" "}
      {groupSolo}, {location}
    </p>
  );
}

export default ExhibitionListItem;
