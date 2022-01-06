export default function CustomizedInputs(props) {
    const { type, name, id, className, placeHolder, disabled, value, isShine,checked=false } = props
    return (
        type !== 'radio' ?
            !isShine ?
                <input type={type} name={name} id={id} className={className} placeholder={placeHolder} disabled={disabled} value={value} /> :
                <div className={`shinemain`}><lines className="shine"></lines></div>
            :
            !isShine ?
                <>
                    <input type={type} name={name} value={value} disabled checked={checked} />
              <span className={"checkmark"} ></span>
              </> :
                <div className={`shinemainradio`}><lines className="shine"></lines></div>
    )
}
