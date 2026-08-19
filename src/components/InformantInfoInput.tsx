function InformantInfoInput() {
  return (
    <div className="bg-white rounded-md p-3 my-3">
      <h1 className="font-bold text-xl underline">Informant Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="col-span-1">
          <label>First Name</label>
          <input
            type="text"
            className="p-2 rounded-md border border-slate-400 bg-white w-full"
          ></input>
        </div>
        <div className="col-span-1">
          <label>Last Name</label>
          <input
            type="text"
            className="p-2 rounded-md border border-slate-400 bg-white w-full"
          ></input>
        </div>
        <div className="col-span-1">
          <label>Contact Number</label>
          <input
            type="text"
            className="p-2 rounded-md border border-slate-400 bg-white w-full"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default InformantInfoInput;
