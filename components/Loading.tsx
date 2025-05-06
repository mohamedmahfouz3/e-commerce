export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary-300 border-r-transparent opacity-75 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      </div>
    </div>
  )
} 