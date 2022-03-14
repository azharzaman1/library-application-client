import { useParams } from "react-router-dom";

const Book = () => {
  const params = useParams();
  const { bookID } = params;
  return <div>Book : {bookID}</div>;
};

export default Book;
