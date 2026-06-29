export interface SocialProfile {
  id: number
  label: string
  profile_url: string
}

export interface Birth {
  date: string
  place: string
}

export interface CurrentJob {
  title: string
  status: string
}

export interface Contact {
  email: string
  social_profiles: SocialProfile[]
}

export interface Profile {
  first_name: string
  middle_name: string
  last_name: string
  nickname: string
  headline: string
  profile_picture_url: string
  summary: string
  birth: Birth
  gender: string
  nationality: string
  current_location: string
  current_job: CurrentJob
  contact: Contact
}

export interface Education {
  id: number
  school: string
  degree: string
  field: string | null
  currently_studying: boolean
  date_start: string
  date_end: string
  grade: string | null
  activity_society: string[]
}

export interface Experience {
  id: number
  title: string
  employment_type: string
  company: string
  location: string
  location_type: string
  currently_working: boolean
  date_start: string
  date_end: string | null
  descriptions: string[]
  skills: string[]
}

export interface License {
  id: number
  name: string
  organization: string
  date_issue: string
  date_expire: string | null
  credential_id: string
  credential_url: string | null
}

export interface Organization {
  id: number
  name: string
  position: string
  membership_ongoing: boolean
  date_start: string
  date_end: string
}

export interface VoluntaryWork {
  id: number
  organization: string
  role: string
  cause: string
  currently_volunteering: boolean
  date_start: string
  date_end: string
}

export interface CvData {
  context: string
  language: string
  version: string
  created_at: number
  updated_at: number
  profile: Profile
  education: Education[]
  experience: Experience[]
  licenses_certifications: License[]
  organizations: Organization[]
  voluntary_works: VoluntaryWork[]
}
