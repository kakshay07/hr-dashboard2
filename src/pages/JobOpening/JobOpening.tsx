import { useEffect, useRef, useState } from "preact/hooks";
import { jobData, profileInfo } from "../../interface/jobOpenings";
import { createRef, h } from "preact";
import Loader from "../../components/Loader";
import './JobOpening.css'
import PageLayout from "../../components/PageLayout/PageLayout";
import { requestHandler } from "../../utils";
import { addJobOpening, editJobOpening, getAllJobOpenings } from "../../api";

const JobOpening : preact.FunctionComponent = () => {
    const [loading, setloading] = useState(false);
    const [loadingTable, setloadingTable] = useState(false);
    const [render, setRender] = useState(0);
    const [option, setoption] = useState<'add' | 'edit' | 'view'>('add')
    const [data, setData] = useState<jobData>(new jobData);
    const [allData, setAllData] = useState<jobData[]>([{
        position: 'engeneer',
        department: 'IT',
        experience: '4+ Years',
        jobType: 'Full Time',
        location: 'Udupi',
        description: '',
        isArchive : 'true',
        profileInformation: [{
            heading: 'this is a heading',
            content: [
                'this is a content',
                'this is content 2',
            ]
        }]
    },
    {
        position: 'engeneer 2',
        department: 'IT',
        experience: '4+ Years',
        jobType: 'Full Time',
        location: 'Udupi',
        description: '',
        isArchive : 'false',
        profileInformation: []
    },
    {
        position: 'engeneer 3',
        department: 'IT',
        experience: '4+ Years',
        jobType: 'Full Time',
        location: 'Udupi',
        description: '',
        isArchive : 'true',
        profileInformation: []
    },
    {
        position: 'engeneer 4',
        department: 'IT',
        experience: '4+ Years',
        jobType: 'Full Time',
        location: 'Udupi',
        description: '',
        isArchive : 'false',
        profileInformation: []
    },
    {
        position: 'engeneer 5' ,
        department: 'IT',
        experience: '4+ Years',
        jobType: 'Full Time',
        location: 'Udupi',
        description: '',
        isArchive : 'false',
        profileInformation: []
    }
])

    // function to add new job-profile info 
    function handleAddProfileInfo() {
        setData((prevState) => {
            return {
                ...prevState,
                profileInformation: [...prevState.profileInformation, new profileInfo()]
            }
        })
    }

    // function to delete job-profile info 
    function handleDeleteProfileInfo(profileInfo: profileInfo) {
        setData((prevState) => {
            let newArray = prevState.profileInformation.filter(state => { return state != profileInfo });
            return {
                ...prevState,
                profileInformation: [...newArray]
            }
        })
    }

    // function to add the job-profile info to main state 
    function handleAddContent(profileInfo: profileInfo) {
        let index = data.profileInformation.indexOf(profileInfo);
        let objectToBeChanged = data.profileInformation[index];
        objectToBeChanged = { ...objectToBeChanged, content: [...objectToBeChanged.content, ''] };
        let newArray = data.profileInformation;
        newArray[index] = objectToBeChanged;
        setData((prevState) => { return { ...prevState, profileInformation: newArray } })
    }

    // function to handle input change 
    function handleOnChange(event: h.JSX.TargetedEvent<HTMLInputElement, Event> | h.JSX.TargetedEvent<HTMLSelectElement, Event>, profileInfo?: profileInfo) {
        if (!profileInfo) {
            setData(prevData => ({
                ...prevData,
                [event.currentTarget.name]: event.currentTarget.value
            }))
        }
    }

    // Profile data binding functionalities 
    let arrLength = data.profileInformation.length;
    const elRefs: {
        current: {
            current: any
        }[]
        
    } = useRef([]);

    useEffect(() => {
        arrLength = data.profileInformation.length;
        if (elRefs.current.length !== arrLength) {
            elRefs.current = Array(arrLength)
                .fill('')
                .map((_, i) => elRefs.current[i] || createRef());

            setRender(prev => prev + 1)
        console.log(render);

        }
    }, [data])

    function handleProfileInfoChange() {
        if (elRefs.current) {
            let dataArray: profileInfo[] = [];

            for (let element of elRefs.current) {

                let currentElement = element.current;
                let dataobj: profileInfo = new profileInfo();
                dataobj.heading = currentElement.querySelector('input[name="heading"]').value;
                currentElement.querySelectorAll('input[name="content"]').forEach((ele: HTMLInputElement) => { return dataobj.content.push(ele.value) });
                dataArray.push(dataobj);
            }

            // console.log(dataArray);

            setData((prevState) => ({
                ...prevState,
                profileInformation: dataArray
            }))

        }
    }

    // html input element attribute generalizer 
    const inputAttributeHelper = (state: jobData) => {
        return (name: keyof jobData) => {
            let value: string | string[];

            if (Array.isArray(state[name])) {
                //this is of no use since we need only string values
                value = (state[name] as profileInfo[]).map(item => item.toString());
            } else {
                value = state[name].toString();
            }

            return {
                name: name,
                value: value,
            };
        };
    };
    const attributeHandler = inputAttributeHelper(data);

    // function to handle form submit event 
    function handleFormSubmit(e : h.JSX.TargetedEvent<HTMLFormElement>){
        e.preventDefault();
        if(option === 'add'){
            console.log('Add');
            console.log(JSON.stringify(data));

            requestHandler(
                async ()=> await addJobOpening(data),
                setloading,
                ()=>{alert('Added successfully !')},
                alert
            )

            handleGetAllJobOpenings();

        } else if(option === 'edit'){
            console.log('Edit');
            console.log(JSON.stringify(data));

            requestHandler(
                async ()=> await editJobOpening(data),
                setloading,
                ()=>{alert('Edit successfull !')},
                alert
            )

            handleGetAllJobOpenings();
        }
    }

    // function to get all job openings
    const handleGetAllJobOpenings = () => {
        return requestHandler(
            async ()=> await getAllJobOpenings(),
            setloadingTable,
            ()=>{},
            alert
        )
    } 

    useEffect(() => {
        document.title = 'Job Openings Master';
        handleGetAllJobOpenings();
    }, [])

    return (
        <>
            {
                loading && <Loader/>
            }
            <PageLayout heading="Job Opening Dashboard">

                <div id="jobOpening">
                    <form onSubmit={(e)=>handleFormSubmit(e)} class='px-3 py-5 bg-transparent  shadow-sm border-2 border rounded' data-bs-theme="dark">
                        <fieldset class="row g-3" disabled={option == 'view'}>
                            <div class="col-3">
                                <select required onInput={e => handleOnChange(e)} {...attributeHandler('department')} id="inputState" class="form-select" >
                                    <option selected value=''>Choose Department</option>
                                    <option value='Design'>Design</option>
                                    <option value='IT'>IT</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <select required onInput={e => handleOnChange(e)} {...attributeHandler('position')} id="inputState" class="form-select" >
                                    <option selected value=''>Choose Position</option>
                                    <option value='Design'>Design</option>
                                    <option value='IT'>IT</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <input required onInput={e => handleOnChange(e)} {...attributeHandler('experience')} type="text" class="form-control" placeholder="Experience" aria-label="Zip" />
                            </div>
                            <div class="col-3">
                                <select required onInput={e => handleOnChange(e)} {...attributeHandler('jobType')} id="inputState" class="form-select" >
                                    <option selected value=''>Choose Job Type</option>
                                    <option value='Full Time'>Full Time</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <input onInput={e => handleOnChange(e)} {...attributeHandler('location')} type="text" class="form-control" placeholder="Location" aria-label="Zip" />
                            </div>
                            <div class="col-9">
                                <input onInput={e => handleOnChange(e)} {...attributeHandler('description')} type="text" class="form-control" placeholder="Description" aria-label="Zip" />
                            </div>
                            {
                                option !== 'add' &&
                                <div class="col-3">
                                    <select onInput={e => handleOnChange(e)} {...attributeHandler('isArchive')} id="inputState" class="form-select" >
                                        <option value='true'>In Archive</option>
                                        <option value='false'>Active</option>
                                    </select>
                                </div>
                            }
                            <div className="col-12 mt-5 ">
                                <button type='button' className="btn btn-success w-20" onClick={handleAddProfileInfo}>Add Profile Information</button>
                            </div>
                            

                            {   
                                // mapping all job-profile information 
                                data?.profileInformation.map(
                                    (info, index) => {
                                        let thisRef = elRefs.current[index];
                                        return (
                                            <div ref={thisRef} className="border border-2 rounded col-12 p-4 row mt-4 mx-0 position-relative">
                                                <div class="col-6">
                                                    <input required onInput={handleProfileInfoChange} value={info.heading} name='heading' type="text" class="form-control" placeholder="Heading" aria-label="Zip" />
                                                </div>
                                                {
                                                    info.content.map((content) => {
                                                        return (
                                                            <div class="col-12 mt-3 position-relative">
                                                                <div className="dot"></div>
                                                                <input onInput={handleProfileInfoChange} name='content' value={content} type="text" class="form-control" placeholder="Content" aria-label="Zip" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div class="col-12 mt-3 d-flex justify-content-between">
                                                    <button title={''} type='button' className="btn btn-danger ms-2 position-absolute top-0 end-0 px-1 py-0 rounded-lg deleteContentBtn" onClick={() => handleDeleteProfileInfo(info)}>
                                                        <i class="fa-solid fa-xmark"></i>
                                                    </button>
                                                    <button type='button' className="btn btn-primary" onClick={() => handleAddContent(info)}>Add Content</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }

                        </fieldset>
                        <div className="col-12 text-center">
                            {option == 'add' && <button type="submit" class="btn btn-primary mt-5 col-1  mx-1">Add</button>}
                            {option == 'edit' && <button type="submit" class="btn btn-success mt-5 col-1  mx-1">update</button>}
                            {option == 'view' && <button type="submit" class="btn btn-success mt-5 col-2  mx-1">View Applicants</button>}
                            <button type="button" class="btn btn-secondary mt-5 col-1 mx-1" 
                            onClick={()=>{
                                setoption('add');
                                setData(new jobData);
                            }}>Cancel</button>
                        </div>
                    </form>
                            
                    <div className="border border-2 border-dark rounded p-0 mt-4 mb-5">
                        <table class="table table-dark table-striped m-0">
                            <thead>
                                <tr>
                                    <th width='20%' scope="col w-30">Position</th>
                                    <th width='20%' scope="col">Department</th>
                                    <th width='20%' scope="col">Experience</th>
                                    <th width='20%' scope="col">Job Type</th>
                                    <th width='20%' scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !loadingTable && allData.map(
                                        data => {
                                            return (
                                                <tr class={`${data.isArchive === 'true' && 'opacity-251'}`}>
                                                    <th>{data.position}</th>
                                                    <td>{data.department}</td>
                                                    <td>{data.experience}</td>
                                                    <td>{data.jobType}</td>
                                                    <td>
                                                        <button onClick={() => {
                                                            setoption('edit');
                                                            setData(data);
                                                            window.scrollTo(0, 0);
                                                        }}
                                                            class='btn btn-success'>Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setoption('view');
                                                                setData(data);
                                                                window.scrollTo(0, 0);

                                                            }}
                                                            class='btn btn-warning mx-1'>View
                                                        </button>
                                                        <button
                                                            onClick={()=>{
                                                                setAllData(prevData => {
                                                                    return prevData.filter(obj => (obj != data))
                                                                })
                                                            }}
                                                            class='btn btn-danger'>Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }

                                {/* === loading state ===  */}
                                {loadingTable && 
                                <>
                                    <TableRowPlaceholder/>
                                    <TableRowPlaceholder/>
                                    <TableRowPlaceholder/>
                                </>}

                                {/* === no data found === */}
                                {allData.length < 1 && <tr>
                                    <td colSpan={5}  style={'text-align:center;color:#818181'}>
                                        No jobs to show {` :(`}
                                    </td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

            </PageLayout>
          
        </>
    )
}

export default JobOpening;


const TableRowPlaceholder = () => {
    return (
        <tr>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <a class="btn btn-success disabled placeholder placeholder-glow col-3 " aria-disabled="true"></a>
                <a class="btn btn-warning disabled placeholder col-3 mx-1" aria-disabled="true"></a>
                <a class="btn btn-danger disabled placeholder col-3 " aria-disabled="true"></a>
            </td>
        </tr>
    )
}

