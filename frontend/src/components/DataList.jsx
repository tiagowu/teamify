import DataHeader from "./DataHeader";

const DataList = ({ buttons, item: Item, list, title, vertical }) => {
  return (
    <div
      className={`flex ${
        vertical && "flex-col"
      } rounded h-full w-full gap-1 overflow-auto overscroll-none scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-track-rounded`}
    >
      <DataHeader title={title} buttons={buttons} vertical={vertical} />
      {list.length > 0 ? (
        list.map((item) => <Item key={item._id} item={item} />)
      ) : (
        <div className="w-full h-full flex justify-center items-center font-bold text-gray-400/50 text-center">NO {title} TO DISPLAY</div>
      )}
    </div>
  );
};

export default DataList;
