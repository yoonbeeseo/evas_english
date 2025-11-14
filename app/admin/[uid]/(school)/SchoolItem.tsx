interface Props extends School {
  onDelete: () => void;
}
const SchoolItem = ({ onDelete, ...school }: Props) => {
  return (
    <div>
      <p>{school.name}</p>
      <button onClick={onDelete}>delete</button>
    </div>
  );
};

export default SchoolItem;
