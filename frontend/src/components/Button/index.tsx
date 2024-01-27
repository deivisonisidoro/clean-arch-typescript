import { ButtonPropsInterface } from "./interfaces/ButtonProps";

function Button({ title = "Sing In", ...rest  }: ButtonPropsInterface){
  return (
      <button {...rest} className="bg-[#645188] hover:bg-[#584877] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        {title}
      </button>
  )
}

export {Button}