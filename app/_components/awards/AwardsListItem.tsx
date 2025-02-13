function AwardsListItem({
  award,
  festivals,
}: {
  award: {
    year: number;
    awardTitle?: string;
    type?: string;
    festival?: string;
    location: string;
    _id: string;
    institute?: string;
  };
  festivals?: boolean;
}) {
  const { year, awardTitle, festival, type, location, institute } = award;

  return (
    <p className="lg:text-xl">
      {year} -{" "}
      {!festivals ? (
        <>
          <span className="font-semibold text-secondary">{awardTitle} </span> -{" "}
        </>
      ) : (
        <span className="font-semibold text-secondary">
          {festival ? `${festival},` : ""}{" "}
        </span>
      )}
      {institute && !festivals && <span>{institute}, </span>}
      {!festivals && festival && <span>{festival}, </span>}
      {festivals && type && <span>{type}, </span>}
      {location}
    </p>
  );
}

export default AwardsListItem;
