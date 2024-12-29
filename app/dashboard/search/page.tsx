import { SearchForm } from "./search-form";

const SearchPage = () => {
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-semibold">Search</h1>
      <SearchForm />
    </div>
  );
};
export default SearchPage;
