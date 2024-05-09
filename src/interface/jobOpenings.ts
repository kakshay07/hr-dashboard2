export class profileInfo {
    heading : string = '';
    content : string[] = []
}

export class jobData {
    id:number=0;
    position : string = '';
    dept_name:string='';
    department : string = '';
    experience : string = '';
    jobType : string = '';
    location : string = '';
    description : string = '';
    isArchive : string = 'false'
    profileInformation : profileInfo[] = []
}

export class applicantData{
    name: string='';
    email:string='';
    phone:string='';
    message:string='';
    isArchive : string = 'false';
    resume:string='';


}
export class department{
    dept_name:string=''
}
