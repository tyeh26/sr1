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

export type EvidenceLabel = 'me' | 'other_party' | 'scene' | 'document' | 'unlabeled';

export interface EvidenceFile {
  id: string;
  file: File;
  preview: string;
  label: EvidenceLabel;
  description: string;
  isFocused: boolean;
}