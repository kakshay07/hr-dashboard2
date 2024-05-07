
function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center position-fixed " style='height :100vh; width:100vw; z-index = 1; backdrop-filter:blur(3px)'>
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Lo.............................</span>
        </div>
    </div>
  )
}

export default Loader