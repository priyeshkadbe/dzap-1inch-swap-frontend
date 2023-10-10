interface TokenInputProps {
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}


const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `flex flex-col bg-[#191B1F] w-[30rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  container: `px-2 py-4 bg-[#20242A] my-3 rounded-2xl border border-[#20242A] hover:border-[#41444F]`,
  selectorContainer: `flex flex-col gap-y-2 `,
  selector: `flex justify-between items-center gap-x-2 `,
  selectorDropdown: `text-gray-300 cursor-pointer flex items-center gap-x-2 bg-[#44556f] p-2 rounded-md `,
  input: `bg-transparent text-xl text-end outline-none`,
  rateContainer: `bg-gray-800 rounded-xl my-4 p-3 flex justify-between items-center`,
  icon: `text-gray-600`,
  button: `w-full flex justify-center items-center gap-x-4 bg-blue-400 rounded-xl py-4 hover:bg-blue-900 text-blue-600 hover:text-white`,
};


const TokenInput: React.FC<TokenInputProps> = ({ placeholder, value, onChange, disabled }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={style.input}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled}
    />
  );
};

export default TokenInput