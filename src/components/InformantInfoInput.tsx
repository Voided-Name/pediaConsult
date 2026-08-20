import InputField from "./InputField";

function InformantInfoInput() {
  return (
    <div className="bg-white rounded-md px-10 pt-10">
      <h1 className="font-bold text-xl">Informant Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <InputField label="First Name" type="text" className="" />
        <InputField label="Last Name" type="text" className="" />
        <InputField label="Contact" type="text" className="" />
      </div>
    </div>
  );
}

export default InformantInfoInput;
