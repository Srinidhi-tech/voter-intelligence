export const VIOLATION_TYPES = [
  { id: 'bribe', label: 'Cash/Gift Distribution (Bribery)' },
  { id: 'religion', label: 'Religious/Caste-based Campaigning' },
  { id: 'silence', label: 'Campaigning during 48hr Silence Period' },
  { id: 'gov_machinery', label: 'Misuse of Government Machinery/Vehicles' },
  { id: 'hate_speech', label: 'Hate Speech or Personal Attacks' }
];

export const generateComplaintLetter = (violationType, candidateName, constituency, date, location, userName, contactInfo) => {
  const commonHeader = `To,
The Returning Officer / Election Commission of India,
Constituency: ${constituency || '[Constituency Name]'}
Date: ${date || new Date().toLocaleDateString()}

Subject: Formal Complaint regarding Model Code of Conduct (MCC) Violation

Respected Sir/Madam,

I am writing to bring to your urgent attention a serious violation of the Model Code of Conduct by ${candidateName || '[Candidate Name]'} at ${location || '[Specific Location]'}.`;

  const commonFooter = `
I request immediate investigation and necessary action under the Representation of the People Act, 1951. I am willing to provide further evidence if required.

Yours faithfully,
${userName || '[Your Name]'}
${contactInfo || '[Your Contact Information]'}`;

  let body = '';

  switch (violationType) {
    case 'bribe':
      body = `It has been observed that the aforementioned candidate/party workers are actively distributing cash, liquor, or gifts to voters in an attempt to influence their voting decision. This is a direct violation of the MCC guidelines prohibiting bribery and corrupt practices.`;
      break;
    case 'religion':
      body = `The candidate has been actively using religious/caste appeals to secure votes. Campaign materials and speeches made at the location explicitly attempt to create communal disharmony and appeal to sectarian sentiments, which is strictly prohibited under the MCC.`;
      break;
    case 'silence':
      body = `Despite the commencement of the campaign silence period (48 hours before polling), the candidate's team is actively conducting rallies, distributing pamphlets, and using loudspeakers in the area.`;
      break;
    case 'gov_machinery':
      body = `The candidate is misusing official government machinery, including government vehicles, rest houses, or public funds, for their election campaign purposes. This provides an unfair advantage and violates the MCC guidelines for the party in power.`;
      break;
    case 'hate_speech':
      body = `During a recent public address, the candidate resorted to unverified allegations, personal attacks, and hate speech against opponents, crossing the bounds of healthy democratic campaigning.`;
      break;
    default:
      body = `The candidate has violated the Model Code of Conduct guidelines issued by the Election Commission of India.`;
  }

  return `${commonHeader}\n\n${body}\n${commonFooter}`;
};
