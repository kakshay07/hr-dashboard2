import { useEffect, useRef, useState } from "preact/hooks";
import { jobData, profileInfo } from "../../interface/jobOpenings";
import { createRef, h } from "preact";
import Loader from "../../components/Loader";
// import handlegetDepartment from "../department/department";
import "./JobOpening.css";
import PageLayout from "../../components/PageLayout/PageLayout";
import { requestHandler } from "../../utils";
import axios from "axios";
import { addJobOpening, editJobOpening, getAllJobOpenings } from "../../api"; //

const JobOpening: preact.FunctionComponent = () => {
  const [loading, setloading] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [render, setRender] = useState(0);
  const [option, setoption] = useState<"add" | "edit" | "view">("add");
  const [data, setData] = useState<jobData>(new jobData());
  const [newdata, setnewData] = useState<jobData>();
  const [allData, setAllData] = useState<jobData[]>([
    //
    // {    id:0,
    //     position: 'engeneer',
    //     department: 'IT',
    //     experience: '4+ Years',
    //     jobType: 'Full Time',
    //     location: 'Udupi',
    //     description: '',
    //     isArchive : 'true',
    //     profileInformation: [{
    //         heading: 'this is a heading',
    //         content: [
    //             'this is a content',
    //             'this is content 2',
    //         ]
    //     }]
    // },
  ]);

  // function to add new job-profile info
  function handleAddProfileInfo() {
    setData((prevState) => {
      return {
        ...prevState,
        profileInformation: [
          ...prevState.profileInformation,
          new profileInfo(),
        ],
      };
    });
  }

  // function to delete job-profile info
  function handleDeleteProfileInfo(profileInfo: profileInfo) {
    setData((prevState) => {
      let newArray = prevState.profileInformation.filter((state) => {
        return state != profileInfo;
      });
      return {
        ...prevState,
        profileInformation: [...newArray],
      };
    });
  }

  // function to add the job-profile info to main state
  function handleAddContent(profileInfo: profileInfo) {
    let index = data.profileInformation.indexOf(profileInfo);
    let objectToBeChanged = data.profileInformation[index];
    objectToBeChanged = {
      ...objectToBeChanged,
      content: [...objectToBeChanged.content, ""],
    };
    let newArray = data.profileInformation;
    newArray[index] = objectToBeChanged;
    setData((prevState) => {
      return { ...prevState, profileInformation: newArray };
    });
  }

  // function to handle input change
  function handleOnChange(
    event:
      | h.JSX.TargetedEvent<HTMLInputElement, Event>
      | h.JSX.TargetedEvent<HTMLSelectElement, Event>,
    profileInfo?: profileInfo
  ) {
    if (!profileInfo) {
      setData((prevData) => ({
        ...prevData,
        [event.currentTarget.name]: event.currentTarget.value,
      }));
    }
  }

  // Profile data binding functionalities
  let arrLength = data.profileInformation.length;
  const elRefs: {
    current: {
      current: any;
    }[];
  } = useRef([]);

  useEffect(() => {
    arrLength = data.profileInformation.length;
    if (elRefs.current.length !== arrLength) {
      elRefs.current = Array(arrLength)
        .fill("")
        .map((_, i) => elRefs.current[i] || createRef());

      setRender((prev) => prev + 1);
      console.log(render);
    }
  }, [data]);

  function handleProfileInfoChange() {
    if (elRefs.current) {
      let dataArray: profileInfo[] = [];

      for (let element of elRefs.current) {
        let currentElement = element.current;
        let dataobj: profileInfo = new profileInfo();
        dataobj.heading = currentElement.querySelector(
          'input[name="heading"]'
        ).value;
        currentElement
          .querySelectorAll('input[name="content"]')
          .forEach((ele: HTMLInputElement) => {
            return dataobj.content.push(ele.value);
          });
        dataArray.push(dataobj);
      }

      // console.log(dataArray);

      setData((prevState) => ({
        ...prevState,
        profileInformation: dataArray,
      }));
    }
  }

  // html input element attribute generalizer
  const inputAttributeHelper = (state: jobData) => {
    return (name: keyof jobData) => {
      let value: string | string[];

      if (Array.isArray(state[name])) {
        //this is of no use since we need only string values
        value = (state[name] as profileInfo[]).map((item) => item.toString());
      } else {
        // console.log(state[name]  , name);

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
  function handleFormSubmit(e: h.JSX.TargetedEvent<HTMLFormElement>) {
    e.preventDefault();
    if (option === "add") {
      console.log("Add");
      // console.log(JSON.stringify(data));
      console.log("here the data comes");

      requestHandler(
        async () => await addJobOpening(data),
        setloading,
        () => {
          alert("Added successfully !");
        },
        alert
      );

      handleGetAllJobOpenings();
    } else if (option === "edit") {
      // console.log('Edit');
      // console.log(JSON.stringify(data),"hello");

      requestHandler(
        async () => await editJobOpening(data),
        setloading,
        () => {
          alert("Edit successfull !");
        },
        alert
      );

      handleGetAllJobOpenings();
    }
    handleGetAllJobOpenings();
    handleGetAllJobOpenings();
  }

  // function to get all job openings
  const handleGetAllJobOpenings = () => {
    return requestHandler(
      async () => await getAllJobOpenings(),
      setloadingTable,
      (response) => {
        console.log(typeof response.data);
        // setAllData([]);
        // for(let data1 of response.data){
        //     console.log(data1.profileInformation ? 'true' :'false' );

        //     if(data1.profileInformation){
        //         setAllData(prev => ([...prev , {...data1 ,  profileInformation : JSON.parse(data1.profileInformation)}]))
        //     } else {
        //         setAllData(prev => ([...prev , {...data1 , profileInformation : [] }]))
        //     }
        // }
        setAllData(response.data);
      },

      alert
    );
  };
  function handlegetDepartment() {
    axios
      .get("http://localhost:5000/get/dept")
      .then((response) => {
        console.log(response.data.result, "handlegetdepartment");
        //  to set only the unique entry to department input option feild
        // const newData:any= [...new Set(response.data.result.map((item1: { dept_name: string; })=>item1.dept_name))]

        setnewData(response.data.result);
      })
      .catch((error) => {
        console.error("error while fetching data", error);
      });
  }

  useEffect(() => {
    document.title = "Job Openings Master";
    handleGetAllJobOpenings();
    handlegetDepartment();
  }, []);

  useEffect(() => {
    console.log(data, "data");
  }, [data]); // it is used to log the data every time when we make changes to data while typing or other changes to data haapens at time

  return (
    <>
      {loading && <Loader />}
      <PageLayout heading="Job Opening Dashboard">
        <div id="jobOpening">
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            class="px-3 py-5 bg-transparent  shadow-sm border-2 border rounded"
            data-bs-theme="dark"
          >
            <fieldset class="row g-3" disabled={option == "view"}>
              <div class="col-3">
                <select
                  required
                  onInput={(e) => handleOnChange(e)}
                  {...attributeHandler("department")}
                  id="inputState"
                  className="form-select"
                >
                  <option selected value="">
                    Choose Department
                  </option>
                  {Array.isArray(newdata) &&
                    newdata.map((data) => (
                      <option style={{ color: "white" }} value={data.dept_name}>
                        {data.dept_name}
                      </option>
                    ))}
                </select>
              </div>
              <div class="col-3">
                <input
                  required
                  onInput={(e) => handleOnChange(e)}
                  {...attributeHandler("position")}
                  id="inputState"
                  class="form-control"
                  placeholder="Type or write your position"
                />
              </div>
              <div class="col-3">
                <input
                  required
                  onInput={(e) => handleOnChange(e)}
                  {...attributeHandler("experience")}
                  type="text"
                  class="form-control"
                  placeholder="Experience"
                  aria-label="Zip"
                />
              </div>
              <div class="col-3">
                <select
                  required
                  onInput={(e) => handleOnChange(e)}
                  {...attributeHandler("jobType")}
                  id="inputState"
                  class="form-select"
                >
                  <option selected value="">
                    Choose Job Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
              <div class="col-3">
                <input
                  onInput={(e) => handleOnChange(e)}
                  {...attributeHandler("location")}
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  aria-label="Zip"
                />
              </div>
              <div class="col-9">
                <input
                  onInput={(e) => handleOnChange(e)}
                  {...attributeHandler("description")}
                  type="text"
                  class="form-control"
                  placeholder="Description"
                  aria-label="Zip"
                />
              </div>
              {/* {
                                option !== 'add' &&
                                <div class="col-3">
                                    <select onInput={e => handleOnChange(e)} {...attributeHandler('isArchive')} id="inputState" class="form-select" >
                                        <option value='true'>In Archive</option>
                                        <option value='false'>Active</option>
                                    </select>
                                </div>
                            } */}
              <div className="col-12 mt-5 ">
                <button
                  type="button"
                  className="btn btn-success w-20"
                  onClick={handleAddProfileInfo}
                >
                  Add Profile Information
                </button>
              </div>

              {data?.profileInformation.map(
                (info: profileInfo, index: number) => {
                  let thisRef = elRefs.current[index];
                  return (
                    <div
                      ref={thisRef}
                      className="border border-2 rounded col-12 p-4 row mt-4 mx-0 position-relative"
                    >
                      <div class="col-6">
                        <input
                          required
                          onInput={handleProfileInfoChange}
                          value={info.heading}
                          name="heading"
                          type="text"
                          class="form-control"
                          placeholder="Heading"
                          aria-label="Zip"
                        />
                      </div>
                      {info.content.map((content) => {
                        return (
                          <div class="col-12 mt-3 position-relative">
                            <div className="dot"></div>
                            <input
                              onInput={handleProfileInfoChange}
                              name="content"
                              value={content}
                              type="text"
                              class="form-control"
                              placeholder="Content"
                              aria-label="Zip"
                            />
                          </div>
                        );
                      })}
                      <div class="col-12 mt-3 d-flex justify-content-between">
                        <button
                          title={""}
                          type="button"
                          className="btn btn-danger ms-2 position-absolute top-0 end-0 px-1 py-0 rounded-lg deleteContentBtn"
                          onClick={() => handleDeleteProfileInfo(info)}
                        >
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleAddContent(info)}
                        >
                          Add Content
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </fieldset>
            <div className="col-12 text-center">
              {option == "add" && (
                <button type="submit" class="btn btn-primary mt-5 col-1  mx-1">
                  Add
                </button>
              )}
              {option == "edit" && (
                <button type="submit" class="btn btn-success mt-5 col-1  mx-1">
                  update
                </button>
              )}
              {option == "view" && (
                <button
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  class="btn btn-success mt-5 col-2  mx-1"
                >
                  View Applicants
                </button>
              )}
              <button
                type="button"
                class="btn btn-secondary mt-5 col-1 mx-1"
                onClick={() => {
                  setoption("add");
                  setData(new jobData());
                  window.scrollTo(0, 0);
                }}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="border border-2 border-dark rounded p-0 mt-4 mb-5">
            <table class="table table-dark table-striped m-0">
              <thead>
                <tr>
                  <th width="20%" scope="col w-30">
                    Position
                  </th>
                  <th width="20%" scope="col">
                    Department
                  </th>
                  <th width="20%" scope="col">
                    Experience
                  </th>
                  <th width="20%" scope="col">
                    Job Type
                  </th>
                  <th width="20%" scope="col">
                    Job Location
                  </th>
                  <th width="20%" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loadingTable &&
                  allData.map((data) => {
                    return (
                      <tr
                        key={data.id}
                        class={`${data.isArchive === "true" && "opacity-251"}`}
                      >
                        <th>{data.position}</th>
                        <td>{data.department}</td>
                        <td>{data.experience}+years</td>
                        <td>{data.jobType}</td>
                        <td>{data.location}</td>
                        <td>
                          <button
                            onClick={() => {
                              setoption("edit");
                              setData(data);
                              window.scrollTo(0, 0);
                            }}
                            class="btn btn-success"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setoption("view");
                              setData(data);
                              window.scrollTo(0, 0);
                            }}
                            class="btn btn-warning mx-1"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setAllData((prevData) => {
                                return prevData.filter((obj) => {
                                  return obj != data;
                                });
                              });
                            }}
                            class="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                {/* modal for view applicant */}

                {/* === loading state ===  */}
                {loadingTable && (
                  <>
                    <TableRowPlaceholder />
                    <TableRowPlaceholder />
                    <TableRowPlaceholder />
                  </>
                )}

                {/* === no data found === */}
                {allData.length < 1 && (
                  <tr>
                    <td colSpan={5} style={"text-align:center;color:#818181"}>
                      No jobs to show {` :(`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            class="modal modal-centered"
            id="exampleModal"
            tabindex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-scrollable modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <table class="table table-light table-striped m-0">
                    <thead>
                      <tr>
                        <th width="20%" scope="col w-30">
                          Position
                        </th>
                        <th width="20%" scope="col">
                          name
                        </th>
                        <th width="20%" scope="col">
                          email
                        </th>
                        <th width="20%" scope="col">
                          phone
                        </th>
                        <th width="20%" scope="col">
                          message
                        </th>
                        <th width="20%" scope="col">
                          resume
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {" "}
                        <td>1</td>
                        <td>23</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>23</td>
                        <td>3</td>
                        <td>asa</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  {/* <button type="button" class="btn btn-primary">Download</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default JobOpening;

const TableRowPlaceholder = () => {
  return (
    <tr>
      <td>
        <p class="placeholder-glow" aria-hidden="true">
          <span class="placeholder col-6"></span>
        </p>
      </td>
      <td>
        <p class="placeholder-glow" aria-hidden="true">
          <span class="placeholder col-6"></span>
        </p>
      </td>
      <td>
        <p class="placeholder-glow" aria-hidden="true">
          <span class="placeholder col-6"></span>
        </p>
      </td>
      <td>
        <p class="placeholder-glow" aria-hidden="true">
          <span class="placeholder col-6"></span>
        </p>
      </td>
      <td>
        <a
          class="btn btn-success  placeholder placeholder-glow col-3 "
          aria-disabled="true"
        ></a>
        <a
          class="btn btn-warning disabled placeholder col-3 mx-1"
          aria-disabled="true"
        ></a>
        <a
          class="btn btn-danger disabled placeholder col-3 "
          aria-disabled="true"
        ></a>
      </td>
    </tr>
  );
};
