  const TopBar = () => {
    return (
      <div className="bg-gray-800 text-white p-2 w-full flex justify-between items-center">
        <form>
          <input type="text" placeholder="Search..." className="border p-1" />
          <button type="submit" className="bg-blue-500 text-white p-1">Search</button>
        </form>
      </div>
    )
  }

  export default TopBar