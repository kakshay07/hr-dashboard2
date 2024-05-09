import PageLayout from "../../components/PageLayout/PageLayout";
import { useEffect, useState} from 'preact/hooks';
import {  h } from "preact";
// import {  profileInfo } from "../../interface/jobOpenings";

import axios from "axios";
// import { profileInfo } from "../../interface/jobOpenings";

const Departmnet: preact.FunctionComponent = () => {
    const [data, setData] = useState({dept_name:'',id:''});
    const [newdata,setNewData]=useState([]);
    const [option, setoption] = useState<'submit' | 'edit' > ('submit')

        
    
    // const [notes, setNotes] = useState<{ title: string }[]>([]);



    
    function handleFormSubmit(e: h.JSX.TargetedEvent<HTMLFormElement>) {
        e.preventDefault();
        if(option==='submit'){
        // setNotes(prevNotes => [...prevNotes, data]);
        // setData({ title: "" });
        axios.post(`http://localhost:5000/Add/dept`,data)
      .then(response => {
        // const { profileInformation } = response.data.newResults;
        // setData(response.data.data);
        console.log(response.data," inserted to department");
        setData({dept_name:'',id:''});
        console.log(handlegetDepartment());
  
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    }else if(option==='edit'){
        console.log(data.dept_name);
        axios.put(`http://localhost:5000/update/dept/${data.id}`,{...data})
     
        .then(response => {
          // const { profileInformation } = response.data.newResults;
          // setData(response.data.data);
          console.log(response.data," inserted to department");
          setData({dept_name:'',id:''});

    });
    }}

    useEffect(() => {
  handlegetDepartment();
    }, [])
    
function handlegetDepartment () {
    axios.get("http://localhost:5000/get/dept")
    .then(response=>{
             console.log(response.data.result,"12345");
             setNewData(response.data.result);
          
             
     }).catch(error=>{
         console.error("error while fetching data",error)
     })
 }

    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        })); 
    };

    // function handleDelete(index: number) {
    //     setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
    // }


    // function 

    return (
        <>
            <PageLayout heading="Add Department">
                <div id="department">
                    <div class="row mb-4">
                        <form class='form-controlpx-3 py-5 bg-transparent shadow-sm border-2 border rounded' action="" onSubmit={(e) => handleFormSubmit(e)}>
                            <div class="col-11">
                                <input class='input-group input-group-lg text-light rounded-1 h2 ml-3 align-item-center' name='dept_name' placeholder='add department' type="text" value={data.dept_name} onChange={ handleChange} />
                            </div>
                            {/* <button type="submit" class="btn btn-primary mb-1 mt-2">Submit</button> */}
                            {option == 'submit' && <button type="submit" class="btn btn-primary mt-5 col-1  mx-1">submit</button>}
                            {option == 'edit' && <button type="submit" class="btn btn-success mt-5 col-1  mx-1">update</button>}
                            <button type="button" class="btn btn-secondary mt-5 col-1 mx-1" 
                            onClick={()=>{
                                setoption('submit');
                                setData({dept_name:'',id:''});
                                window.scrollTo(0,0);
                            }}>Cancel</button>
                        </form>
                      
                        <table class="table table-dark table-striped mt-3 ">
                            <thead>
                                <tr>
                           
                                    <th class='col-12' width='20%' scope="col">Department</th>
                                    <th class='col-1' width='20%' scope="col">Action</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                      Array.isArray(newdata) && newdata.map(
                                        (data:any)=> {
                                            return (
                                                
                                                <tr class='' key={data.id} >
                                                    <td class=''>{data.dept_name}</td>
                                                  
                                                   
                                                  
                                                    <td class=''>
                                                        <button onClick={() => {  
                                                            setoption('edit')  
                                                            setData(data);
                                                            window.scrollTo(0, 0);
                                                        }}
                                                            class='btn btn-success'>Edit
                                                        </button>
                                                        
                                                   
                                                       
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }





                      
                            

                                
                            </tbody>
                        </table>
                          
                        </div>
                    </div>
           
            </PageLayout>
        </>
    );
};

export default Departmnet;