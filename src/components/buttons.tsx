import React from "react"
interface btnProps {
  height?: string
  width?: string
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
          hover:bg-primary hover:text-white hover:cursor-pointer
          disabled:bg-[#fafafa] disabled:text-[#e5e5e3] disabled:hover:cursor-not-allowed
          shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        "
        disabled={props.isDisabled}
      >
        {props.text}
      </button>
    </>
  )
}

const BiggestButton: React.FC<btnProps> = (props) => {
  const w = props.width ? `w-[${props.width}]` : "w-full"
  const h = props.height ? `h-[${props.height}]` : "h-full"
  return (
    <div className={`${w} ${h}`}>
      <ButtonBase text={props.text} isDisabled={props.isDisabled} />
    </div>
  )
}

export {
  BiggestButton
}
