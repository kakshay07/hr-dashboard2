import './PageLayout.css';

const PageLayout = ({heading , children} : {heading : string , children : any}) => {
  return (
    <div className="container bg-transparent" >
        <div className="pb-4 heading align-items-center justfy-content-center d-flex flex-wrap">
            <span class='shadow-sm' >{heading}</span>
            <img src="https://tse2.mm.bing.net/th?id=OIP.9kLadk-ff48v9vs0zQL12QHaE7&pid=Api&P=0&h=180" alt="" style={`width:200px; margin-left:auto;opacity:.3;`} />
        </div>
        {children}
    </div>
  )
}

export default PageLayout