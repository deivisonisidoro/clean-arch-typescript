import { ButtonPropsInterface } from "./interfaces/ButtonProps";

function Button({ title = "Sing In"  }: ButtonPropsInterface){
  return (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        {title}
      </button>
  )
}

export {Button}