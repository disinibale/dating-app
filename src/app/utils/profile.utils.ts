import Profile from "../../models/profile.model";
import { MappedProfile } from "../controllers/profile.controller";

export function calculateAge(dateOfBirth: Date): number {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const birthMonth = birthDate.getMonth();
  const currentMonth = currentDate.getMonth();
  const birthDay = birthDate.getDate();
  const currentDay = currentDate.getDate();

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  return age;
}

export function mapProfile(profile: Profile): MappedProfile {
  const { user } = profile;
  const premiumPackages = user.userSubscriptions.map((subscription) => `has${subscription.premiumPackage.name.replace(' ', '')}`);

  return {
    profile: {
      id: profile.id,
      dateOfBirth: profile.dateOfBirth,
      bio: profile.bio,
      gender: profile.gender,
      userId: profile.userId,
      age: calculateAge(profile.dateOfBirth as Date),
      fullname: user.fullname,
      premiumPackages,
    },
  };
}

export function mapPotentialProfile(profiles: Profile[]): {
  id: number;
  dateOfBirth: Date | null;
  bio: string | null;
  gender: 'Male' | 'Female';
  userId: number;
  age: number | null;
  fullname: string;
}[] {
  return profiles.map((profile) => ({
    id: profile.id,
    dateOfBirth: profile.dateOfBirth,
    bio: profile.bio,
    gender: profile.gender === 'M' ? 'Male' : 'Female',
    userId: profile.user.id,
    age: calculateAge(profile.dateOfBirth),
    fullname: profile.user.fullname
  }))

}