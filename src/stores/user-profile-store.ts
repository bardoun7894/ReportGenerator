import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
          // Organization Info
          educationRegion?: string;
          schoolName?: string;
          schoolType?: string;
          department?: string;
          schoolLogo?: string;

          // Personnel
          activityLeaderName?: string;
          activityLeaderTitle?: string;
          principalName?: string;
          principalTitle?: string;

          // Preferences
          preferredTemplate?: string;

          // Metadata
          createdAt?: Date;
          updatedAt?: Date;
}

interface UserProfileState {
          profile: UserProfile;
          isProfileComplete: boolean;

          // Actions
          updateProfile: (data: Partial<UserProfile>) => void;
          clearProfile: () => void;
          checkProfileComplete: () => boolean;
}

const initialProfile: UserProfile = {};

export const useUserProfileStore = create<UserProfileState>()(
          persist(
                    (set, get) => ({
                              profile: initialProfile,
                              isProfileComplete: false,

                              updateProfile: (data) => {
                                        const updatedProfile = {
                                                  ...get().profile,
                                                  ...data,
                                                  updatedAt: new Date(),
                                        };

                                        // Check if first time setup
                                        if (!get().profile.createdAt && Object.keys(data).length > 0) {
                                                  updatedProfile.createdAt = new Date();
                                        }

                                        set({
                                                  profile: updatedProfile,
                                                  isProfileComplete: get().checkProfileComplete(),
                                        });
                              },

                              clearProfile: () => set({
                                        profile: initialProfile,
                                        isProfileComplete: false
                              }),

                              checkProfileComplete: () => {
                                        const p = get().profile;
                                        return !!(p.schoolName && p.educationRegion);
                              },
                    }),
                    {
                              name: 'reportcreator-user-profile',
                    }
          )
);

// Selector hooks
export const useUserProfile = () => useUserProfileStore((state) => state.profile);
export const useIsProfileComplete = () => useUserProfileStore((state) => state.isProfileComplete);

// Executor options
export const EXECUTOR_OPTIONS = [
          'جميع منسوبي/ات المدرسة',
          'رائد/ة النشاط',
          'الموجه/ة الطلابي/ة',
          'معلم/ة المادة',
          'لجنة النشاط',
          'فريق العمل التطوعي',
          'الإدارة المدرسية',
          'مجموعة من المعلمين/ات',
          'الطلاب/الطالبات المتميزين/ات',
          'اللجنة الثقافية',
          'اللجنة الرياضية',
          'اللجنة الاجتماعية',
];
