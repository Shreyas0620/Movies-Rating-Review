export const InlineError =({text})=>{
    return (
        <div className="text-subMain w-full mt-2 text-xs font-medium">
            <p className="text-red-500 text-sm">{text || 'An error occurred'}</p>
        </div>
    )
}