import './PageLayout.css';

const PageLayout = ({heading , children} : {heading : string , children : any}) => {
  return (
    <div className="container bg-transparent" >
        <div className="pb-4 heading align-items-center justfy-content-center d-flex flex-wrap">
            <span class='shadow-sm' >{heading}</span>
            <img src="https://d3jbf8nvvpx3fh.cloudfront.net/home/_resource/_img/website/2015/GDTPL_logo_.png" alt="" style={`width:200px; margin-left:auto;opacity:.3;`} />
        </div>
        {children}
    </div>
  )
}

export default PageLayout