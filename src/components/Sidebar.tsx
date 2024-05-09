import { useEffect, useState } from "preact/hooks";

const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(location.pathname === '/' ? 'jobOpenings' : location.pathname.slice(1))
    useEffect(() => {
        console.log(activeTab);
        
    }, [activeTab])
    

    return (
        <ul class='sidebar_list'>
            <li class='active'>
                <a class={`${activeTab === 'jobOpenings' && 'active'}`} href='/' onClick={()=>setActiveTab('jobOpenings')}>
                    <i class="fa-solid fa-add"></i>
                </a>
            </li>
            <li class='active'>
                <a class={`${activeTab === 'applicants' && 'active'}`} href='/applicants' onClick={()=>setActiveTab('applicants')}>
                    <i class="fa-solid fa-people-line"></i>
                </a>
            </li>
            <li class='active'>
                <a class={`${activeTab === 'department' && 'active'}`} href='/department' onClick={()=>setActiveTab('department')}>
                    <i  class="fa-solid fa-code"></i>
                </a>
            </li>
            
        </ul>
    )
}

export default Sidebar;