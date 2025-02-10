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
  };
  festivals?: boolean;
}) {
  const { year, awardTitle, festival, type, location } = award;

  return (
    <p className="lg:text-xl">
      {year} -{" "}
      {!festivals ? (
        <>
          <span className="font-semibold text-secondary">{awardTitle} </span> -
        </>
      ) : (
        <span className="font-semibold text-secondary">{festival}, </span>
      )}
      {!festivals && <span>{festival}, </span>}
      {festivals && type && <span>{type}, </span>}
      {location}
    </p>
  );
}

export default AwardsListItem;
