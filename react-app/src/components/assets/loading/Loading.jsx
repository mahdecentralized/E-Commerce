export default function Loading() {
   return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
         <div className='spinner-border text-light' role='status'>
            <span className='visually-hidden'>Loading...</span>
         </div>
      </div>
   );
}
