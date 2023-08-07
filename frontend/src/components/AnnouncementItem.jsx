import LabeledText from "./LabeledText";

const AnnouncementItem = ({ item }) => {
  const createdAt = new Date(item.createdAt);

  return (
    <div className="w-full bg-inherit px-2">
      <div className="w-full bg-slate-300 rounded-lg p-3">
        <LabeledText label="Title">
          <p className="whitespace-normal break-words sm:text-md md:text-lg/tight">{item.title}</p>
        </LabeledText>
        <LabeledText label="Announcement">
          <p className="whitespace-normal break-words sm:text-sm md:text-md">{item.content} </p>
        </LabeledText>
        <div className="text-sm whitespace-normal break-words text-end">
          <p>{item.team.name}</p>
          <p>
            {item.author.user.firstName} {item.author.user.lastName} {createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementItem;
