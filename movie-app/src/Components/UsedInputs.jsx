export const Message =({label,placeholder,name,register})=>{
    return(
        <div className="text-sm w-full">
            <label className="text-border font-semibold">{label}</label>
            <textarea className="w-full  bg-main h-40 mt-2 p-6 border border-border rounded" placeholder={placeholder}  {...register} name={name} ></textarea>
        </div>
    )
} 
export const Select =({label,options,register,name})=>{
    return(

        <>
        <label className="text-border font-semibold">{label}</label>
        <select className="w-full mt-2 px-6 py-4 bg-main border border-border rounded" {...register} name={name} id="">
            {options.map((o,i)=>((<option key={i} value={o.value}>{o.title}</option>)))}
        </select>
        </>
    )
}

export const Input =({label,placeholder,type,bg,register,name,value,onChange})=>{
    return(

        <div className="text-sm w-full">
        <label className="text-border font-semibold">{label}</label>
          <input type={type}  name={name} value={value} onChange={onChange} {...register} placeholder={placeholder} className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
            bg ? 'bg-main' : "bg-dry"
          }`}/>
        </div>
    )
}