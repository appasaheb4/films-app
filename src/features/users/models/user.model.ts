export class Users {
  _id: string;
  userId: string;
  empCode: string;
  defaultLab: string;
  lab: any[];
  password: string;
  passChanged: boolean;
  deginisation: string;
  fullName: string;
  mobileNo: string;
  contactNo: string;
  email: string;
  dateOfBirth: Date;
  marriageAnniversary: Date;
  userDegree: string;
  department: any[];
  exipreDate: Date;
  expireDays: number;
  role: any[];
  validationLevel: number;
  createdBy: string;
  confidential: boolean;
  signature: any;
  picture: any;
  status: string;
  environment: string;
  confirguration: boolean;
  systemInfo: {
    ipAddress: any[];
    workstation: any[];
    accessInfo: {
      mobile: boolean;
      desktop: boolean;
    };
  };
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.userId = rawData.userId;
    this.empCode = rawData.empCode;
    this.defaultLab = rawData.defaultLab;
    this.lab = rawData.lab;
    this.password = rawData.password;
    this.passChanged = rawData.passChanged;
    this.deginisation = rawData.deginisation;
    this.fullName = rawData.fullName;
    this.mobileNo = rawData.mobileNo;
    this.contactNo = rawData.contactNo;
    this.email = rawData.email;
    this.dateOfBirth = rawData.dateOfBirth;
    this.userDegree = rawData.userDegree;
    this.department = rawData.department;
    this.exipreDate = rawData.exipreDate;
    this.expireDays = rawData.expireDays;
    this.role = rawData.role;
    this.validationLevel = rawData.validationLevel;
    this.createdBy = rawData.createdBy;
    this.confidential = rawData.confidential;
    this.signature = rawData.signature;
    this.picture = rawData.picture;
    this.marriageAnniversary = rawData.marriageAnniversary;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.confirguration = rawData.confirguration;
    this.systemInfo = rawData.systemInfo;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
