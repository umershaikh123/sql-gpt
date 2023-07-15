import BarLoader from 'react-spinners/BarLoader'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <div className="relative w-[100rem] h-[90vh]">
        <div className="absolute top-[40%] left-[35%]">
          <BarLoader color="#FF4081" width="20rem" />
        </div>
      </div>
    </>
  )
}

// return (
//   <>
//     {isLoading && (
//       <>
//         <div>Loading AUTH...</div>
//       </>
//     )}

//     {error && (
//       <>
//         <div>{error.message}</div>;
//       </>
//     )}

//     {user ? (
//       <div className=" container mx-auto">
//         <Navbar />
//         {children}
//       </div>
//     ) : (
//       <>
//         <Auth />
//       </>
//     )}
//   </>
// )
