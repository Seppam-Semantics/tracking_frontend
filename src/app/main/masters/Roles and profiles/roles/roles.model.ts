export interface Roles {
  id:number;
  name: string
  profiles: AssignProfile[]
  createdBy: string
  modifiedBy: string
  active: boolean

}

export interface AssignProfile {
  id: number
  profileName:string;
}