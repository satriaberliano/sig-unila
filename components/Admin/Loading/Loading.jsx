const Loading = ({width = 7}) => {
  return (
    <div className='flex justify-center items-center'>
      <div className={`border-r-[2px] border-white w-${width} h-${width} aspect-square rounded-full text-white animate-spin-slow`}>
        {""}
      </div>
    </div>
  )
}

export default Loading