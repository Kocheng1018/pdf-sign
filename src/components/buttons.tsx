import React from "react"
interface btnProps {
  text: string
  isDisabled: boolean
}
const ButtonBase: React.FC<btnProps> = props => {
  return (
    <>
      <button
        className="
          w-full h-full
          bg-light-main text-dark
          tracking-[1em]
          text-center
          indent-4
          hover:bg-primary hover:text-white hover:cursor-pointer
          disabled:bg-[#fafafa] disabled:text-[#e5e5e3] disabled:hover:cursor-not-allowed
          shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          xs:text-sm
          sm:text-sm
        "
        disabled={props.isDisabled}
      >
        {props.text}
      </button>
    </>
  )
}

const BiggestButton: React.FC<btnProps> = (props) => {
  return (
    <ButtonBase text={props.text} isDisabled={props.isDisabled} />
  )
}

export {
  BiggestButton
}
