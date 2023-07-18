import DataHeader from "./DataHeader";

const DataList = ({ buttons, item: Item, list, title, vertical }) => {
  return (
    <div
      className={`flex ${
        vertical && "flex-col"
      } rounded h-full w-full overflow-auto overscroll-none scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-track-rounded`}
    >
      <DataHeader title={title} buttons={buttons} vertical={vertical} />
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default DataList;
