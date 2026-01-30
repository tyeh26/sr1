export interface SR1Data {
  accident_details: {
    date: string;
    time: string;
    location: string;
    description: string;
  };
  other_party: {
    fullName: string;
    address: string;
    idNumber: string;
    insuranceCompany: string;
    policyNumber: string;
    vin: string;
    plate: string;
  };
}